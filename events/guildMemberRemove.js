const {
  AttachmentBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const createGoodbyeCard = require("../utils/goodbyeCard");
const config = require("../config");
const MARKER_ROLE = "🎮 GAME ROLES";

module.exports = {
  name: "guildMemberRemove",

  async execute(member) {
    try {
      const image = await createGoodbyeCard(member);
      // ===================================
      // Collect Game Roles Before They Are Lost
      // ===================================

      const markerRole = member.guild.roles.cache.find(
        (role) => role.name === MARKER_ROLE,
      );

      let revokedRoles = [];

      if (markerRole) {
        revokedRoles = member.roles.cache
          .filter(
            (role) =>
              role.id !== member.guild.id &&
              role.position < markerRole.position,
          )
          .map((role) => role);
      }
      const attachment = new AttachmentBuilder(image, {
        name: "goodbye.png",
      });

      const embed = new EmbedBuilder()

        .setColor("#ff3b6b")

        .setTitle("👋 A Member Left GAME ZONE")

        .setDescription(
          `**${member.user.tag}** has left the server.

We hope you enjoyed your stay.

❤️ You're always welcome back.

👥 Members Remaining: **${member.guild.memberCount}**`,
        )

        .setImage("attachment://goodbye.png")

        .setThumbnail(member.user.displayAvatarURL())

        .setFooter({
          text: config.serverName,
        })

        .setTimestamp();

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()

          .setLabel("Join Again")

          .setEmoji("🎮")

          .setStyle(ButtonStyle.Link)

          .setURL(config.inviteURL),
      );

      const channel = member.guild.channels.cache.get(config.goodbyeChannel);

      if (!channel) return;

      await channel.send({
        embeds: [embed],

        files: [attachment],

        components: [row],
      });
      let leaveReason = "Member left the server";

      try {
        const auditLogs = await member.guild.fetchAuditLogs({
          type: 20, // MEMBER_KICK
          limit: 1,
        });

        const kickLog = auditLogs.entries.first();

        if (
          kickLog &&
          kickLog.target &&
          kickLog.target.id === member.id &&
          Date.now() - kickLog.createdTimestamp < 5000
        ) {
          leaveReason = `Member kicked by ${kickLog.executor.tag}`;
        }
      } catch (err) {
        console.log("Could not read audit logs.");
      }

      await member.client.logger.logMemberLeft(member);

      await member.client.logger.logRoleRevoked(
        member,
        revokedRoles,
        leaveReason,
      );
    } catch (err) {
      console.error("guildMemberRemove failed:", err);
    }
  },
};

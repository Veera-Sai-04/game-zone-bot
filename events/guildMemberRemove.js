const {
  AttachmentBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const { createGoodbyeCard } = require("../utils/goodbyeCard");
const config = require("../config");

module.exports = {
  name: "guildMemberRemove",

  async execute(member) {
    try {
      const image = await createGoodbyeCard(member);

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
    } catch (err) {
      console.error(err);
    }
  },
};

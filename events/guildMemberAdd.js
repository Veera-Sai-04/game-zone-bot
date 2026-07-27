const {
  EmbedBuilder,
  AttachmentBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const createWelcomeCard = require("../utils/welcomeCard");

const config = require("../config");

module.exports = {
  name: "guildMemberAdd",

  async execute(member) {
    try {
      // Auto Role

      const role = member.guild.roles.cache.get(config.autoRole);

      if (role) {
        await member.roles.add(role).catch(() => {});
      }

      // Welcome Image

      const image = await createWelcomeCard(member);

      const attachment = new AttachmentBuilder(image, {
        name: "welcome.png",
      });

      // Embed

      const embed = new EmbedBuilder()

        .setColor("#00eaff")

        .setTitle("🎉 Welcome to GAME ZONE")

        .setDescription(
          `Welcome ${member}!

We hope you enjoy your stay.

> 📜 Read the rules

> 🎮 Pick your gaming roles

> 💬 Join the community

Member Count: **${member.guild.memberCount}**`,
        )

        .setImage("attachment://welcome.png")

        .setThumbnail(member.user.displayAvatarURL())

        .setFooter({
          text: "GAME ZONE",
        })

        .setTimestamp();

      // Buttons

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()

          .setLabel("Rules")

          .setEmoji("📜")

          .setStyle(ButtonStyle.Link)

          .setURL(config.rulesURL),

        new ButtonBuilder()

          .setLabel("Roles")

          .setEmoji("🎮")

          .setStyle(ButtonStyle.Link)

          .setURL(config.rolesURL),
      );

      // Send

      const channel = member.guild.channels.cache.get(config.welcomeChannel);

      if (channel) {
        await channel.send({
          content: `Welcome ${member}! 👋`,

          embeds: [embed],

          files: [attachment],

          components: [row],
        });
      }
    } catch (err) {
      console.error(err);
    }
  },
};

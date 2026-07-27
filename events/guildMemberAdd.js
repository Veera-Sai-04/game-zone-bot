const { AttachmentBuilder } = require("discord.js");

const createWelcomeCard = require("../utils/welcomeCard");
const config = require("../config");

module.exports = (client) => {
  client.on("guildMemberAdd", async (member) => {
    try {
      /**
       * -----------------------------
       * Give Citizen Role
       * -----------------------------
       */

      const citizenRole = member.guild.roles.cache.get(config.citizenRole);

      if (citizenRole) {
        await member.roles.add(citizenRole).catch(() => {});
      }

      /**
       * -----------------------------
       * Welcome Channel
       * -----------------------------
       */

      const channel = member.guild.channels.cache.get(config.welcomeChannel);

      if (!channel) return;

      /**
       * -----------------------------
       * Create Welcome Card
       * -----------------------------
       */

      const image = await createWelcomeCard(member);

      const attachment = new AttachmentBuilder(image, {
        name: "welcome.png",
      });

      /**
       * -----------------------------
       * Send Welcome Message
       * -----------------------------
       */

      const message = await channel.send({
        content: `🎉 Welcome ${member} to **${config.serverName}**!`,

        files: [attachment],
      });

      /**
       * -----------------------------
       * Delete Welcome Ping
       * (Optional)
       * -----------------------------
       */
    } catch (err) {
      console.error("Welcome Event Error:", err);
    }
  });
};

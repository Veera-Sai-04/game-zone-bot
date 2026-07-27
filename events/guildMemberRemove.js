const { AttachmentBuilder } = require("discord.js");

const createGoodbyeCard = require("../utils/goodbyeCard");
const config = require("../config");

module.exports = (client) => {
  client.on("guildMemberRemove", async (member) => {
    try {
      /**
       * Goodbye Channel
       */

      const channel = member.guild.channels.cache.get(config.goodbyeChannel);

      if (!channel) return;

      /**
       * Create Goodbye Card
       */

      const image = await createGoodbyeCard(member);

      const attachment = new AttachmentBuilder(image, {
        name: "goodbye.png",
      });

      /**
       * Send Goodbye Card
       */

      await channel.send({
        content: `👋 **${member.user.username}** has left **${config.serverName}**.`,

        files: [attachment],
      });
    } catch (err) {
      console.error("Goodbye Event Error:", err);
    }
  });
};

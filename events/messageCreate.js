const { extractGameName, findGameRole } = require("../utils/roleUtils");
const config = require("../config");

module.exports = (client) => {
  client.on("messageCreate", async (message) => {
    // Ignore bots
    if (message.author.bot) return;

    // Ignore DMs
    if (!message.guild) return;

    // Only Roles Channel
    if (message.channel.id !== config.rolesChannel) return;

    // Bot must be mentioned
    if (!message.mentions.has(client.user)) return;

    // --------------------------
    // Extract Game Name
    // --------------------------

    const gameName = extractGameName(message.content);

    if (!gameName) {
      const reply = await message.reply({
        content:
          "❌ Invalid format.\n\nUse:\n```Game Name : Grand RP\nGame Id : 247986\n@Game Zone Bot```\n\nThis message will be deleted automatically in 1 minute.",
      });

      setTimeout(async () => {
        try {
          await message.delete();
          await reply.delete();
        } catch {}
      }, config.card.autoDeleteTime);

      return;
    }

    // --------------------------
    // Find Role
    // --------------------------

    const role = findGameRole(message.guild, gameName);

    if (!role) {
      const reply = await message.reply({
        content:
          "❌ Unknown game name.\n\nThis message will be deleted automatically in 1 minute.",
      });

      setTimeout(async () => {
        try {
          await message.delete();
          await reply.delete();
        } catch {}
      }, config.card.autoDeleteTime);

      return;
    }

    // --------------------------
    // Already Has Role
    // --------------------------

    if (message.member.roles.cache.has(role.id)) {
      const reply = await message.reply({
        content: `⚠️ You already have **${role.name}** role.\n\nThis message will be deleted automatically in 1 minute.`,
      });

      setTimeout(async () => {
        try {
          await message.delete();
          await reply.delete();
        } catch {}
      }, config.card.autoDeleteTime);

      return;
    }

    // --------------------------
    // Assign Role
    // --------------------------

    try {
      await message.member.roles.add(role);

      const reply = await message.reply({
        content: `✅ Successfully assigned **${role.name}** role.\n\nThis message will be deleted automatically in 1 minute.`,
      });

      setTimeout(async () => {
        try {
          await message.delete();
          await reply.delete();
        } catch {}
      }, config.card.autoDeleteTime);
    } catch (err) {
      console.error(err);

      const reply = await message.reply({
        content:
          "❌ I don't have permission to assign this role.\n\nThis message will be deleted automatically in 1 minute.",
      });

      setTimeout(async () => {
        try {
          await message.delete();
          await reply.delete();
        } catch {}
      }, config.card.autoDeleteTime);
    }
  });
};

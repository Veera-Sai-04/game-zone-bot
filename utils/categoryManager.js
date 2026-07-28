const { ChannelType } = require("discord.js");
const { getCategoryPermissions } = require("./permissionManager");
const { createGameChannels } = require("./channelManager");
// const LogManager = require("./logManager");

/**
 * Creates or returns an existing game category.
 *
 * @param {Guild} guild
 * @param {Role} gameRole
 * @returns {Promise<CategoryChannel>}
 */

async function createGameCategory(guild, gameRole) {
  // -------------------------------
  // Check if category already exists
  // -------------------------------

  let category = guild.channels.cache.find(
    (channel) =>
      channel.type === ChannelType.GuildCategory &&
      channel.name === gameRole.name,
  );

  if (category) {
    return {
      category,
      created: false,
    };
  }

  // -------------------------------
  // Create category
  // -------------------------------

  category = await guild.channels.create({
    name: gameRole.name,

    type: ChannelType.GuildCategory,

    permissionOverwrites: getCategoryPermissions(guild, gameRole),

    reason: `GAME ZONE BOT - Created category for ${gameRole.name}`,
  });

  // -------------------------------
  // Create default channels
  // -------------------------------

  await createGameChannels(guild, category);

  return {
    category,
    created: true,
  };
}

module.exports = {
  createGameCategory,
};

const { ChannelType } = require("discord.js");
const config = require("../config");

/**
 * Creates all default channels
 * inside a game category.
 *
 * @param {Guild} guild
 * @param {CategoryChannel} category
 */

async function createGameChannels(guild, category) {
  // -----------------------
  // TEXT CHANNELS
  // -----------------------

  for (const channelName of config.gameChannels.text) {
    const exists = guild.channels.cache.find(
      (channel) =>
        channel.parentId === category.id && channel.name === channelName,
    );

    if (exists) continue;

    await guild.channels.create({
      name: channelName,

      type: ChannelType.GuildText,

      parent: category.id,

      reason: `GAME ZONE BOT - ${channelName}`,
    });
  }

  // -----------------------
  // VOICE CHANNELS
  // -----------------------

  for (const channelName of config.gameChannels.voice) {
    const exists = guild.channels.cache.find(
      (channel) =>
        channel.parentId === category.id && channel.name === channelName,
    );

    if (exists) continue;

    await guild.channels.create({
      name: channelName,

      type: ChannelType.GuildVoice,

      parent: category.id,

      reason: `GAME ZONE BOT - ${channelName}`,
    });
  }
}

module.exports = {
  createGameChannels,
};

const { PermissionFlagsBits } = require("discord.js");
const config = require("../config");

/**
 * Returns permission overwrites for a game category.
 *
 * @param {Guild} guild
 * @param {Role} gameRole
 * @returns {Array}
 */

function getCategoryPermissions(guild, gameRole) {
  const founderRole = guild.roles.cache.get(config.founderRole);

  const overwrites = [
    // Hide category from everyone
    {
      id: guild.roles.everyone.id,

      deny: [PermissionFlagsBits.ViewChannel],
    },

    // Allow game role
    {
      id: gameRole.id,

      allow: [
        // General
        PermissionFlagsBits.ViewChannel,

        // Text
        PermissionFlagsBits.SendMessages,
        PermissionFlagsBits.SendMessagesInThreads,
        PermissionFlagsBits.CreatePublicThreads,
        PermissionFlagsBits.CreatePrivateThreads,
        PermissionFlagsBits.ReadMessageHistory,
        PermissionFlagsBits.EmbedLinks,
        PermissionFlagsBits.AttachFiles,
        PermissionFlagsBits.AddReactions,
        PermissionFlagsBits.UseExternalEmojis,
        PermissionFlagsBits.UseExternalStickers,
        PermissionFlagsBits.UseApplicationCommands,

        // Voice
        PermissionFlagsBits.Connect,
        PermissionFlagsBits.Speak,
        PermissionFlagsBits.Stream,
        PermissionFlagsBits.UseSoundboard,
        PermissionFlagsBits.UseExternalSounds,
        PermissionFlagsBits.UseVAD,
      ],
    },
  ];

  // Founder Full Access

  if (founderRole) {
    overwrites.push({
      id: founderRole.id,

      allow: [PermissionFlagsBits.Administrator],
    });
  }

  return overwrites;
}

module.exports = {
  getCategoryPermissions,
};

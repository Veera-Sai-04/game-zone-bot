const { AuditLogEvent } = require("discord.js");

module.exports = {
  name: "guildMemberUpdate",

  async execute(oldMember, newMember) {
    const logger = newMember.client.logger;

    const addedRoles = newMember.roles.cache.filter(
      (role) => !oldMember.roles.cache.has(role.id),
    );

    const removedRoles = oldMember.roles.cache.filter(
      (role) => !newMember.roles.cache.has(role.id),
    );

    if (!addedRoles.size && !removedRoles.size) return;

    let executor = "Unknown";

    try {
      const fetchedLogs = await newMember.guild.fetchAuditLogs({
        type: AuditLogEvent.MemberRoleUpdate,
        limit: 1,
      });

      const log = fetchedLogs.entries.first();

      if (
        log &&
        log.target.id === newMember.id &&
        Date.now() - log.createdTimestamp < 5000
      ) {
        executor = log.executor;
      }
    } catch (err) {
      console.error(err);
    }

    for (const role of addedRoles.values()) {
      await logger.logManualRoleAdded({
        member: newMember,
        role,
        executor,
      });
    }

    for (const role of removedRoles.values()) {
      await logger.logManualRoleRemoved({
        member: newMember,
        role,
        executor,
      });
    }
  },
};

const aliases = require("../data/aliases");

/**
 * Normalize text
 */
function normalize(text) {
  return text.toLowerCase().trim().replace(/\s+/g, " ");
}

/**
 * Extract game name from user message
 */
function extractGameName(content) {
  const lines = content.split("\n");

  for (const line of lines) {
    const lower = line.toLowerCase();

    if (lower.startsWith("game name")) {
      const parts = line.split(":");
      if (parts.length >= 2) {
        return normalize(parts.slice(1).join(":"));
      }
    }
  }

  return null;
}

/**
 * Convert aliases to official game names
 */
function resolveAlias(gameName) {
  return aliases[gameName] || gameName;
}

/**
 * Find matching Discord role
 */
function findGameRole(guild, gameName) {
  const target = resolveAlias(normalize(gameName));

  return guild.roles.cache.find((role) => {
    const roleName = normalize(role.name);

    return (
      roleName === target ||
      roleName.includes(target) ||
      target.includes(roleName)
    );
  });
}

module.exports = {
  normalize,
  extractGameName,
  resolveAlias,
  findGameRole,
};

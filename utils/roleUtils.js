const aliases = require("../data/aliases");
const config = require("../config");
const { EmbedBuilder } = require("discord.js");
const { createGameCategory } = require("./categoryManager");

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
async function findGameRole(guild, gameName, member) {
  const input = normalize(gameName);

  // Resolve alias
  const target = resolveAlias(input);

  // If no alias exists, don't create a role
  if (target === input && !aliases[input]) {
    return null;
  }

  // Search existing role
  let role = guild.roles.cache.find((role) => {
    const roleName = normalize(role.name);

    return (
      roleName === target ||
      roleName.includes(target) ||
      target.includes(roleName)
    );
  });

  // Create role if it doesn't exist
  if (!role) {
    role = await guild.roles.create({
      name: target
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      mentionable: true,
      reason: `Requested by ${member.user.tag}`,
    });

    console.log(`✅ Created new role: ${role.name}`);
    // ==========================================
    // Create Game Category
    // ==========================================

    // try {
    //   await createGameCategory(guild, role);
    //   console.log(`📁 Category ready for ${role.name}`);
    // } catch (err) {
    //   console.error("Failed to create game category:", err);
    // }

    // ==========================================
    // Move below 🎮 GAME ROLES
    // ==========================================

    const markerRole = guild.roles.cache.find(
      (r) => r.name === "🎮 GAME ROLES",
    );

    if (markerRole) {
      try {
        await role.setPosition(markerRole.position - 1);
        console.log(`📌 Moved ${role.name} below 🎮 GAME ROLES`);
      } catch (err) {
        console.error("Failed to move role:", err);
      }
    }

    // ==========================================
    // Proof Log
    // ==========================================

    const proofChannel = guild.channels.cache.get(config.logs.proof);

    if (proofChannel) {
      let positionText = "Below 🎮 GAME ROLES";

      if (markerRole) {
        const belowRole = guild.roles.cache
          .filter((r) => r.position < markerRole.position && r.id !== role.id)
          .sort((a, b) => b.position - a.position)
          .first();

        if (belowRole) {
          positionText = `Below ${belowRole.name}`;
        }
      }

      const embed = new EmbedBuilder()
        .setColor("#0099ff")
        .setDescription(
          `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🎮 NEW GAME ROLE CREATED

👤 **Requested By**
${member}

🎮 **Game Entered**
\`${gameName}\`

🔄 **Resolved Alias**
\`${target}\`

🏷️ **Role Created**
${role}

🆔 **Role ID**
\`${role.id}\`

📍 **Position**
${positionText}

⏰ **Time**
<t:${Math.floor(Date.now() / 1000)}:F>

⚠️ **ACTION REQUIRED**

Please review this role and configure
channel permissions if necessary.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        )
        .setFooter({
          text: "GAME ZONE BOT",
        });

      await proofChannel.send({
        embeds: [embed],
      });
    }
  }
  // ==========================================
  // Ensure category exists
  // ==========================================

  try {
    const result = await createGameCategory(guild, role);

    if (result.created) {
      await guild.client.logger.logCategoryCreated({
        member,
        gameEntered: gameName,
        resolvedAlias: target,
        role,
        category: result.category,
      });
    }
  } catch (err) {
    console.error("Failed to ensure category exists:", err);
  }

  return role;
}

module.exports = {
  normalize,
  extractGameName,
  resolveAlias,
  findGameRole,
};

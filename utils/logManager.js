const { EmbedBuilder } = require("discord.js");
const config = require("../config");

class LogManager {
  constructor(client) {
    this.client = client;
  }

  getChannel(channelId) {
    return this.client.channels.cache.get(channelId);
  }

  async send(channelId, payload) {
    try {
      const channel = this.getChannel(channelId);

      if (!channel) {
        console.log(`[LOG] Channel not found: ${channelId}`);
        return;
      }

      await channel.send(payload);
    } catch (err) {
      console.error("[LOG MANAGER]", err);
    }
  }

  // ============================
  // ROLE ASSIGNED
  // ============================

  async logRoleAssigned({ member, gameEntered, resolvedAlias, role }) {
    const now = new Date();

    const embed = new EmbedBuilder()
      .setColor("#57F287")
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setDescription(
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🟢 GAME ROLE ASSIGNED

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 USER INFORMATION

• Mention
  ${member}

• Username
  ${member.user.username}

• Display Name
  ${member.displayName}

• User ID
  ${member.id}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎮 GAME INFORMATION

• Game Entered
  ${gameEntered}

• Resolved Alias
  ${resolvedAlias}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏷️ ROLE INFORMATION

• Assigned Role
  ${role}

• Role ID
  ${role.id}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🤖 ACTION INFORMATION

• Assigned By
  GAME ZONE BOT

• Channel
  <#${config.rolesChannel}>

• Date
  ${now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })}

• Time
  ${now.toLocaleTimeString("en-GB")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      )
      .setFooter({
        text: "GAME ZONE BOT • Logging System",
      })
      .setTimestamp();

    await this.send(config.logs.gameRole, {
      embeds: [embed],
    });
  }
  // ============================
  // GAME CATEGORY CREATED
  // ============================

  async logCategoryCreated({
    member,
    gameEntered,
    resolvedAlias,
    role,
    category,
  }) {
    const now = new Date();

    const embed = new EmbedBuilder()
      .setColor("#5865F2")
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setDescription(
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🟦 GAME CATEGORY CREATED

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 USER INFORMATION

• Mention
  ${member}

• Username
  ${member.user.username}

• Display Name
  ${member.displayName}

• User ID
  ${member.id}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎮 GAME INFORMATION

• Game Entered
  ${gameEntered}

• Resolved Alias
  ${resolvedAlias}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏷️ ROLE INFORMATION

• Game Role
  ${role}

• Role ID
  ${role.id}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📁 CATEGORY INFORMATION

• Category
  ${category.name}

• Category ID
  ${category.id}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📂 CHANNELS CREATED

• #game-chat
• #team
• 🔊 Voice Chat

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🤖 ACTION INFORMATION

• Created By
  GAME ZONE BOT

• Date
  ${now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })}

• Time
  ${now.toLocaleTimeString("en-GB")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      )
      .setFooter({
        text: "GAME ZONE BOT • Category System",
      })
      .setTimestamp();

    await this.send(config.logs.category, {
      embeds: [embed],
    });
  }
  // ============================
  // UNKNOWN GAME
  // ============================

  async logUnknownGame({ member, gameEntered }) {
    const now = new Date();

    const embed = new EmbedBuilder()
      .setColor("#9B59B6")
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setDescription(
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🟣 UNKNOWN GAME

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 USER INFORMATION

• Mention
  ${member}

• Username
  ${member.user.username}

• Display Name
  ${member.displayName}

• User ID
  ${member.id}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎮 GAME INFORMATION

• Entered Game
  ${gameEntered}

• Status
  No matching alias found

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🤖 ACTION INFORMATION

• Checked By
  GAME ZONE BOT

• Date
  ${now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })}

• Time
  ${now.toLocaleTimeString("en-GB")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      )
      .setFooter({
        text: "GAME ZONE BOT • Logging System",
      })
      .setTimestamp();

    await this.send(config.logs.gameRole, {
      embeds: [embed],
    });
  }

  // ============================
  // BOT ERROR
  // ============================

  async logBotError({ member, action, error }) {
    const now = new Date();

    const embed = new EmbedBuilder().setColor("#ED4245");

    if (member) {
      embed.setThumbnail(
        member.user.displayAvatarURL({
          dynamic: true,
          size: 512,
        }),
      );
    }

    embed
      .setDescription(
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔴 BOT ERROR

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 USER INFORMATION

• Mention
  ${member ? member : "Unknown"}

• Username
  ${member ? member.user.username : "Unknown"}

• Display Name
  ${member ? member.displayName : "Unknown"}

• User ID
  ${member ? member.id : "Unknown"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ ERROR INFORMATION

• Action
  ${action}

• Error

\`\`\`
${error}
\`\`\`

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🤖 ACTION INFORMATION

• Logged By
  GAME ZONE BOT

• Date
  ${now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })}

• Time
  ${now.toLocaleTimeString("en-GB")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      )
      .setFooter({
        text: "GAME ZONE BOT • Logging System",
      })
      .setTimestamp();

    await this.send(config.logs.gameRole, {
      embeds: [embed],
    });
  }
  // ============================
  // MEMBER JOIN
  // ============================

  async logMemberJoin(member) {
    console.log("logMemberJoin called");
    console.log("Member Log Channel:", config.logs.member);
    const now = new Date();

    const embed = new EmbedBuilder()
      .setColor("#57F287")
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setDescription(
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🟢 MEMBER JOINED

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 USER INFORMATION

• Mention
  ${member}

• Username
  ${member.user.username}

• Display Name
  ${member.displayName}

• User ID
  ${member.id}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚪 JOIN INFORMATION

• Member Count
  ${member.guild.memberCount}

• Discord Account Created
  ${new Date(member.user.createdTimestamp).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })}

• Joined Server
  ${now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🤖 ACTION INFORMATION

• Logged By
  GAME ZONE BOT

• Date
  ${now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })}

• Time
  ${now.toLocaleTimeString("en-GB")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      )
      .setFooter({
        text: "GAME ZONE BOT • Logging System",
      })
      .setTimestamp();

    await this.send(config.logs.member, {
      embeds: [embed],
    });
  }

  // ============================
  // MEMBER LEFT
  // ============================

  async logMemberLeft(member) {
    console.log("logMemberLeft called");
    console.log("Member Log Channel:", config.logs.member);
    const now = new Date();

    const embed = new EmbedBuilder()
      .setColor("#FEE75C")
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setDescription(
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🟡 MEMBER LEFT

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 USER INFORMATION

• Mention
  <@${member.id}>

• Username
  ${member.user.username}

• Display Name
  ${member.displayName}

• User ID
  ${member.id}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚪 LEAVE INFORMATION

• Members Remaining
  ${member.guild.memberCount}

• Reason
  Left the Server

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🤖 ACTION INFORMATION

• Logged By
  GAME ZONE BOT

• Date
  ${now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })}

• Time
  ${now.toLocaleTimeString("en-GB")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      )
      .setFooter({
        text: "GAME ZONE BOT • Logging System",
      })
      .setTimestamp();

    await this.send(config.logs.member, {
      embeds: [embed],
    });
  }
  // ============================
  // ROLE REVOKED
  // ============================

  async logRoleRevoked(member, roles, reason = "Member Left Server") {
    const now = new Date();

    const roleList =
      roles.length > 0
        ? roles.map((role) => `${role}`).join("\n")
        : "No Roles Found";

    const embed = new EmbedBuilder()
      .setColor("#FAA61A")
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setDescription(
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🟠 ROLES REVOKED

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 USER INFORMATION

• Mention
  <@${member.id}>

• Username
  ${member.user.username}

• Display Name
  ${member.displayName}

• User ID
  ${member.id}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏷️ ROLE INFORMATION

• Revoked Roles

${roleList}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🤖 ACTION INFORMATION

• Total Roles
  ${roles.length}

• Reason
  ${reason}

• Logged By
  GAME ZONE BOT

• Date
  ${now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })}

• Time
  ${now.toLocaleTimeString("en-GB")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      )
      .setFooter({
        text: "GAME ZONE BOT • Logging System",
      })
      .setTimestamp();

    await this.send(config.logs.revoked, {
      embeds: [embed],
    });
  }
  async logManualRoleAdded({ member, role, executor }) {
    const now = new Date();

    const embed = new EmbedBuilder()
      .setColor("#57F287")
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setDescription(
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🟢 ROLE ADDED

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 USER INFORMATION

• Mention
  ${member}

• Username
  ${member.user.username}

• Display Name
  ${member.displayName}

• User ID
  ${member.id}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏷️ ROLE INFORMATION

• Added Role
  ${role}

• Role ID
  ${role.id}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👮 MODERATOR INFORMATION

• Added By
  ${executor}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🤖 ACTION INFORMATION

• Date
  ${now.toLocaleDateString("en-GB")}

• Time
  ${now.toLocaleTimeString("en-GB")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      )
      .setFooter({
        text: "GAME ZONE BOT • Logging System",
      })
      .setTimestamp();

    await this.send(config.logs.gameRole, {
      embeds: [embed],
    });
  }
  async logManualRoleRemoved({ member, role, executor }) {
    const now = new Date();

    const embed = new EmbedBuilder()
      .setColor("#ED4245")
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setDescription(
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔴 ROLE REMOVED

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 USER INFORMATION

• Mention
  ${member}

• Username
  ${member.user.username}

• Display Name
  ${member.displayName}

• User ID
  ${member.id}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏷️ ROLE INFORMATION

• Removed Role
  ${role}

• Role ID
  ${role.id}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👮 MODERATOR INFORMATION

• Removed By
  ${executor}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🤖 ACTION INFORMATION

• Date
  ${now.toLocaleDateString("en-GB")}

• Time
  ${now.toLocaleTimeString("en-GB")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      )
      .setFooter({
        text: "GAME ZONE BOT • Logging System",
      })
      .setTimestamp();

    await this.send(config.logs.gameRole, {
      embeds: [embed],
    });
  }
}

module.exports = LogManager;

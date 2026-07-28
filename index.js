require("dotenv").config();

const { Client, GatewayIntentBits, Partials } = require("discord.js");
const LogManager = require("./utils/logManager");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],

  partials: [Partials.Channel],
});

client.logger = new LogManager(client);

/**
 * -------------------------
 * Register Events
 * -------------------------
 */

const guildMemberAdd = require("./events/guildMemberAdd");
const guildMemberRemove = require("./events/guildMemberRemove");
const guildMemberUpdate = require("./events/guildMemberUpdate");

client.on("guildMemberAdd", guildMemberAdd.execute);
client.on("guildMemberRemove", guildMemberRemove.execute);
client.on("guildMemberUpdate", guildMemberUpdate.execute);

// Register message event
require("./events/messageCreate")(client);
/**
 * -------------------------
 * Ready Event
 * -------------------------
 */

client.once("clientReady", () => {
  console.clear();

  console.log("===========================================");
  console.log("        GAME ZONE BOT ONLINE");
  console.log("===========================================");
  console.log(`Logged in as: ${client.user.tag}`);
  console.log("Welcome System   : ✅ Ready");
  console.log("Goodbye System   : ✅ Ready");
  console.log("Role System      : ✅ Ready");
  console.log("===========================================");
});

/**
 * -------------------------
 * Login
 * -------------------------
 */

client.login(process.env.TOKEN);

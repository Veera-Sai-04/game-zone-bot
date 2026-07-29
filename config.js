module.exports = {
  // ============================================
  // DISCORD BOT
  // ============================================

  token: process.env.DISCORD_TOKEN,

  clientId: "1530833146650693762",

  guildId: "1512670028850528386",

  serverName: "GAME ZONE",

  webMonitor: true,
  expressPort: process.env.PORT || 3000,

  // ============================================
  // CHANNELS
  // ============================================

  welcomeChannel: "1512692689517281412",

  goodbyeChannel: "1531283179699306547",

  rulesChannel: "1512692742155931738",

  rolesChannel: "1512693324904140800",

  proofChannel: "1531595305634762802",

  logs: {
    proof: "1531595305634762802",
    gameRole: "1531605980419195140",
    member: "1531606054247333938",
    revoked: "1531606127710830602",

    category: "1531686896550416567",
  },

  // ============================================
  // GAME CATEGORY SYSTEM
  // ============================================

  founderRole: "1512676877981188197",

  gameChannels: {
    text: ["game-chat", "team"],

    voice: ["Voice Chat"],
  },

  // ============================================
  // AUTO ROLE
  // ============================================

  autoRole: "1512683496789905649",

  // ============================================
  // IMPORTANT LINKS
  // ============================================

  inviteURL: "https://discord.gg/7sDQgjSGTW",

  rulesURL:
    "https://discord.com/channels/1512670028850528386/1512692742155931738",

  rolesURL:
    "https://discord.com/channels/1512670028850528386/1512693324904140800",

  // ============================================
  // WELCOME / GOODBYE CARD
  // ============================================

  card: {
    width: 1920,
    height: 1080,

    background: "./assets/background.png",
    logo: "./assets/logo.png",
    hexagon: "./assets/hexagon.png",

    avatarSize: 230,

    primaryColor: "#00EAFF",
    secondaryColor: "#FF2D75",

    textColor: "#FFFFFF",
    subTextColor: "#CFCFCF",

    autoDeleteTime: 60000,
  },

  // ============================================
  // GAME ROLE ALIASES
  // ============================================

  aliases: {
    // Grand RP
    "grand rp": "grand rp",
    "grand roleplay": "grand rp",
    grandrp: "grand rp",

    // GTA
    gta: "gta",
    "gta v": "gta",
    "gta 5": "gta",
    gta5: "gta",

    // RDO
    rdo: "rdo",
    "red dead online": "rdo",
    rdr2: "rdo",
    "rdr2 online": "rdo",

    // ETS2
    ets2: "euro truck simulator 2",
    "euro truck simulator": "euro truck simulator 2",
    "euro truck simulator 2": "euro truck simulator 2",

    // Forza
    forza: "forza horizon",
    "forza horizon": "forza horizon",
    "forza horizon 5": "forza horizon",

    // Fortnite
    fortnite: "fortnite",

    // Among Us
    "among us": "among us",

    // Marvel Rivals
    "marvel rivals": "marvel rivals",
  },
};

const path = require("path");
const { GlobalFonts } = require("@napi-rs/canvas");

GlobalFonts.registerFromPath(
  path.join(__dirname, "../assets/fonts/Orbitron-Bold.ttf"),
  "Orbitron",
);

GlobalFonts.registerFromPath(
  path.join(__dirname, "../assets/fonts/Rajdhani-Bold.ttf"),
  "Rajdhani",
);

module.exports = {
  WIDTH: 1920,
  HEIGHT: 1080,

  colors: {
    blue: "#00eaff",
    pink: "#ff2bd6",
    white: "#ffffff",
    gray: "#cfd6e6",
    dark: "#08101d",
  },

  assets: {
    background: path.join(__dirname, "../assets/background.png"),
    overlay: path.join(__dirname, "../assets/overlay.png"),
    corners: path.join(__dirname, "../assets/corners.png"),
    frame: path.join(__dirname, "../assets/frame.png"),
    glow: path.join(__dirname, "../assets/glow.png"),
    logo: path.join(__dirname, "../assets/logo.png"),
  },

  avatar: {
    x: 190,
    y: 350,
    size: 310,
  },

  logo: {
    x: 65,
    y: 55,
    size: 120,
  },

  title: {
    x: 560,
    y: 235,
  },

  username: {
    x: 560,
    y: 510,
  },

  member: {
    x: 560,
    y: 610,
  },
};

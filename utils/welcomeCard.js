const { createCanvas, loadImage, GlobalFonts } = require("@napi-rs/canvas");
const path = require("path");
const config = require("../config");

// ===========================
// Register Fonts
// ===========================

GlobalFonts.registerFromPath(
  path.join(__dirname, "../assets/fonts/Orbitron-Bold.ttf"),
  "Orbitron",
);

try {
  GlobalFonts.registerFromPath(
    path.join(__dirname, "../assets/fonts/Rajdhani-Bold.ttf"),
    "Rajdhani",
  );
} catch {}

// ===========================
// Rounded Rectangle Helper
// ===========================

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();

  ctx.moveTo(x + radius, y);

  ctx.lineTo(x + width - radius, y);

  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);

  ctx.lineTo(x + width, y + height - radius);

  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);

  ctx.lineTo(x + radius, y + height);

  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);

  ctx.lineTo(x, y + radius);

  ctx.quadraticCurveTo(x, y, x + radius, y);

  ctx.closePath();
}

// ===========================
// Neon Text Helper
// ===========================

function neonText(ctx, text, x, y, size, color, blur = 25, font = "Orbitron") {
  ctx.save();

  ctx.font = `bold ${size}px ${font}`;

  ctx.textAlign = "center";

  ctx.fillStyle = color;

  ctx.shadowColor = color;

  ctx.shadowBlur = blur;

  ctx.fillText(text, x, y);

  ctx.restore();
}

// ===========================
// Main Function
// ===========================

async function createWelcomeCard(member) {
  const canvas = createCanvas(config.card.width, config.card.height);

  const ctx = canvas.getContext("2d");

  // ===========================
  // Load Assets
  // ===========================

  const background = await loadImage(
    path.join(__dirname, "../assets/background.png"),
  );

  const logo = await loadImage(path.join(__dirname, "../assets/logo.png"));

  const hexagon = await loadImage(
    path.join(__dirname, "../assets/hexagon.png"),
  );

  const avatar = await loadImage(
    member.user.displayAvatarURL({
      extension: "png",
      size: 512,
    }),
  );
  // ===========================
  // Background
  // ===========================

  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  // ===========================
  // Dark Overlay
  // ===========================

  const overlay = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

  overlay.addColorStop(0, "rgba(0,0,0,.35)");
  overlay.addColorStop(0.45, "rgba(0,0,0,.50)");
  overlay.addColorStop(1, "rgba(0,0,0,.65)");

  ctx.fillStyle = overlay;

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ===========================
  // Hexagon Overlay
  // ===========================

  ctx.save();

  ctx.globalAlpha = 0.1;

  ctx.drawImage(hexagon, 0, 0, canvas.width, canvas.height);

  ctx.restore();

  // ===========================
  // Logo Glow
  // ===========================

  ctx.save();

  ctx.shadowColor = "#00D8FF";
  ctx.shadowBlur = 40;

  ctx.drawImage(logo, 45, 25, 215, 215);

  ctx.restore();

  // ===========================
  // Neon Corners
  // ===========================

  ctx.save();

  ctx.strokeStyle = "#00D8FF";

  ctx.lineWidth = 5;

  ctx.shadowColor = "#00D8FF";

  ctx.shadowBlur = 30;

  const corner = 120;
  const pad = 40;

  // Top Left

  ctx.beginPath();

  ctx.moveTo(pad, pad);
  ctx.lineTo(pad + corner, pad);

  ctx.moveTo(pad, pad);
  ctx.lineTo(pad, pad + corner);

  ctx.stroke();

  // Top Right

  ctx.beginPath();

  ctx.moveTo(canvas.width - pad, pad);
  ctx.lineTo(canvas.width - pad - corner, pad);

  ctx.moveTo(canvas.width - pad, pad);
  ctx.lineTo(canvas.width - pad, pad + corner);

  ctx.stroke();

  // Bottom Left

  ctx.beginPath();

  ctx.moveTo(pad, canvas.height - pad);

  ctx.lineTo(pad + corner, canvas.height - pad);

  ctx.moveTo(pad, canvas.height - pad);

  ctx.lineTo(pad, canvas.height - pad - corner);

  ctx.stroke();

  // Bottom Right

  ctx.beginPath();

  ctx.moveTo(canvas.width - pad, canvas.height - pad);

  ctx.lineTo(canvas.width - pad - corner, canvas.height - pad);

  ctx.moveTo(canvas.width - pad, canvas.height - pad);

  ctx.lineTo(canvas.width - pad, canvas.height - pad - corner);

  ctx.stroke();

  ctx.restore();

  // ===========================
  // Glass Panel
  // ===========================

  ctx.save();

  const panelGradient = ctx.createLinearGradient(560, 120, 1360, 640);

  panelGradient.addColorStop(0, "rgba(20,20,35,.60)");

  panelGradient.addColorStop(1, "rgba(10,10,20,.35)");

  ctx.fillStyle = panelGradient;

  roundRect(ctx, 560, 120, 800, 560, 28);

  ctx.fill();

  ctx.strokeStyle = "rgba(0,216,255,.35)";

  ctx.lineWidth = 2;

  ctx.stroke();

  ctx.restore();

  // ===========================
  // HUD Lines
  // ===========================

  ctx.save();

  ctx.strokeStyle = "rgba(0,216,255,.25)";

  ctx.lineWidth = 2;

  // Top

  ctx.beginPath();

  ctx.moveTo(600, 170);

  ctx.lineTo(1320, 170);

  ctx.stroke();

  // Bottom

  ctx.beginPath();

  ctx.moveTo(600, 640);

  ctx.lineTo(1320, 640);

  ctx.stroke();

  // Left

  ctx.beginPath();

  ctx.moveTo(600, 170);

  ctx.lineTo(600, 640);

  ctx.stroke();

  // Right

  ctx.beginPath();

  ctx.moveTo(1320, 170);

  ctx.lineTo(1320, 640);

  ctx.stroke();

  ctx.restore();
  // ===========================
  // Avatar Background Glow
  // ===========================

  const avatarGlow = ctx.createRadialGradient(960, 280, 10, 960, 280, 230);

  avatarGlow.addColorStop(0, "rgba(0,216,255,.55)");
  avatarGlow.addColorStop(0.3, "rgba(0,216,255,.22)");
  avatarGlow.addColorStop(0.65, "rgba(0,216,255,.10)");
  avatarGlow.addColorStop(1, "rgba(0,216,255,0)");

  ctx.fillStyle = avatarGlow;

  ctx.beginPath();

  ctx.arc(960, 280, 220, 0, Math.PI * 2);

  ctx.fill();

  // ===========================
  // Avatar Neon Rings
  // ===========================

  ctx.save();

  ctx.shadowColor = "#00D8FF";
  ctx.shadowBlur = 45;

  // Ring 1

  ctx.beginPath();

  ctx.arc(960, 280, 145, 0, Math.PI * 2);

  ctx.lineWidth = 4;

  ctx.strokeStyle = "#FFFFFF";

  ctx.stroke();

  // Ring 2

  ctx.beginPath();

  ctx.arc(960, 280, 132, 0, Math.PI * 2);

  ctx.lineWidth = 8;

  ctx.strokeStyle = "#00D8FF";

  ctx.stroke();

  // Ring 3

  ctx.beginPath();

  ctx.arc(960, 280, 120, 0, Math.PI * 2);

  ctx.lineWidth = 2;

  ctx.strokeStyle = "rgba(255,255,255,.8)";

  ctx.stroke();

  ctx.restore();

  // ===========================
  // Draw Avatar
  // ===========================

  ctx.save();

  ctx.beginPath();

  ctx.arc(960, 280, 115, 0, Math.PI * 2);

  ctx.closePath();

  ctx.clip();

  ctx.drawImage(avatar, 845, 165, 230, 230);

  ctx.restore();

  // ===========================
  // Scanner Ring
  // ===========================

  ctx.save();

  ctx.strokeStyle = "rgba(0,216,255,.35)";

  ctx.lineWidth = 2;

  ctx.beginPath();

  ctx.arc(960, 280, 160, Math.PI * 1.15, Math.PI * 1.75);

  ctx.stroke();

  ctx.beginPath();

  ctx.arc(960, 280, 160, Math.PI * 0.1, Math.PI * 0.45);

  ctx.stroke();

  ctx.restore();

  // ===========================
  // HUD Dots
  // ===========================

  ctx.fillStyle = "#00D8FF";

  [
    [785, 280],
    [1135, 280],
    [960, 105],
    [960, 455],
  ].forEach(([x, y]) => {
    ctx.beginPath();

    ctx.arc(x, y, 4, 0, Math.PI * 2);

    ctx.fill();
  });

  // ===========================
  // Side HUD Lines
  // ===========================

  ctx.save();

  ctx.strokeStyle = "rgba(0,216,255,.30)";

  ctx.lineWidth = 2;

  // Left

  ctx.beginPath();

  ctx.moveTo(760, 280);

  ctx.lineTo(825, 280);

  ctx.stroke();

  // Right

  ctx.beginPath();

  ctx.moveTo(1095, 280);

  ctx.lineTo(1160, 280);

  ctx.stroke();

  // Top

  ctx.beginPath();

  ctx.moveTo(960, 80);

  ctx.lineTo(960, 145);

  ctx.stroke();

  // Bottom

  ctx.beginPath();

  ctx.moveTo(960, 415);

  ctx.lineTo(960, 480);

  ctx.stroke();

  ctx.restore();
  // ===========================
  // Welcome Title
  // ===========================

  neonText(
    ctx,
    `WELCOME TO ${config.serverName.toUpperCase()}`,
    960,
    470,
    58,
    "#FFFFFF",
    35,
  );

  // Cyan Underline

  ctx.save();

  ctx.strokeStyle = "#00D8FF";
  ctx.lineWidth = 3;
  ctx.shadowColor = "#00D8FF";
  ctx.shadowBlur = 20;

  ctx.beginPath();
  ctx.moveTo(700, 500);
  ctx.lineTo(1220, 500);
  ctx.stroke();

  ctx.restore();

  // ===========================
  // Username
  // ===========================

  neonText(
    ctx,
    member.user.globalName || member.user.username,
    960,
    555,
    46,
    "#7BEAFF",
    20,
    "Rajdhani",
  );

  // ===========================
  // Member Count
  // ===========================

  ctx.save();

  ctx.font = "30px Rajdhani";

  ctx.textAlign = "center";

  ctx.fillStyle = "#FFFFFF";

  ctx.fillText(`Member #${member.guild.memberCount}`, 960, 605);

  ctx.restore();

  // ===========================
  // Welcome Message
  // ===========================

  ctx.save();

  ctx.font = "26px Rajdhani";

  ctx.textAlign = "center";

  ctx.fillStyle = "#BFEFFF";

  ctx.fillText("Ready to begin your adventure?", 960, 645);

  ctx.restore();

  // ===========================
  // Decorative Divider
  // ===========================

  ctx.save();

  ctx.strokeStyle = "rgba(0,216,255,.30)";
  ctx.lineWidth = 2;

  // Left

  ctx.beginPath();
  ctx.moveTo(610, 690);
  ctx.lineTo(845, 690);
  ctx.stroke();

  // Right

  ctx.beginPath();
  ctx.moveTo(1075, 690);
  ctx.lineTo(1310, 690);
  ctx.stroke();

  ctx.restore();

  // ===========================
  // HUD Accent Dots
  // ===========================

  ctx.save();

  ctx.fillStyle = "#00D8FF";

  [
    [845, 690],
    [1075, 690],
  ].forEach(([x, y]) => {
    ctx.beginPath();

    ctx.arc(x, y, 4, 0, Math.PI * 2);

    ctx.fill();
  });

  ctx.restore();

  // ===========================
  // Small Status Text
  // ===========================

  ctx.save();

  ctx.font = "20px Rajdhani";

  ctx.fillStyle = "rgba(255,255,255,.65)";

  ctx.textAlign = "center";

  ctx.fillText("SYSTEM STATUS : CONNECTED", 960, 730);

  ctx.restore();
  // ===========================
  // Footer Buttons
  // ===========================

  const footerY = 760;

  const boxWidth = 270;

  const boxHeight = 60;

  const gap = 35;

  const totalWidth = boxWidth * 3 + gap * 2;

  const startX = (canvas.width - totalWidth) / 2;

  const footerItems = ["📜 Read Rules", "🎮 Get Roles", "💬 Have Fun"];

  footerItems.forEach((text, index) => {
    const x = startX + index * (boxWidth + gap);

    ctx.save();

    const buttonGradient = ctx.createLinearGradient(
      x,
      footerY,
      x,
      footerY + boxHeight,
    );

    buttonGradient.addColorStop(0, "rgba(15,25,45,.70)");

    buttonGradient.addColorStop(1, "rgba(5,10,20,.40)");

    ctx.fillStyle = buttonGradient;

    ctx.strokeStyle = "#00D8FF";

    ctx.lineWidth = 2;

    ctx.shadowColor = "#00D8FF";

    ctx.shadowBlur = 18;

    roundRect(ctx, x, footerY, boxWidth, boxHeight, 16);

    ctx.fill();

    ctx.stroke();

    ctx.restore();

    ctx.save();

    ctx.textAlign = "center";

    ctx.font = "24px Rajdhani";

    ctx.fillStyle = "#FFFFFF";

    ctx.fillText(text, x + boxWidth / 2, footerY + 38);

    ctx.restore();
  });

  // ===========================
  // Floating Particles
  // ===========================

  ctx.save();

  for (let i = 0; i < 180; i++) {
    const px = Math.random() * canvas.width;

    const py = Math.random() * canvas.height;

    const radius = Math.random() * 2 + 0.5;

    ctx.beginPath();

    ctx.fillStyle = `rgba(0,216,255,${Math.random() * 0.3})`;

    ctx.arc(px, py, radius, 0, Math.PI * 2);

    ctx.fill();
  }

  ctx.restore();

  // ===========================
  // Bottom Glow Line
  // ===========================

  ctx.save();

  const glow = ctx.createLinearGradient(560, 930, 1360, 930);

  glow.addColorStop(0, "rgba(0,216,255,0)");

  glow.addColorStop(0.5, "rgba(0,216,255,.90)");

  glow.addColorStop(1, "rgba(0,216,255,0)");

  ctx.strokeStyle = glow;

  ctx.lineWidth = 3;

  ctx.shadowColor = "#00D8FF";

  ctx.shadowBlur = 25;

  ctx.beginPath();

  ctx.moveTo(560, 930);

  ctx.lineTo(1360, 930);

  ctx.stroke();

  ctx.restore();

  // ===========================
  // Watermark
  // ===========================

  ctx.save();

  ctx.textAlign = "right";

  ctx.font = "20px Rajdhani";

  ctx.fillStyle = "rgba(255,255,255,.35)";

  ctx.fillText(config.serverName, canvas.width - 40, canvas.height - 25);

  ctx.restore();

  // ===========================
  // Return PNG
  // ===========================

  return canvas.encode("png");
}

module.exports = createWelcomeCard;

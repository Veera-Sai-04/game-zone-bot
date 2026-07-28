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
// Rounded Rectangle
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
// Neon Text
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
// Goodbye Card
// ===========================

async function createGoodbyeCard(member) {
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
  overlay.addColorStop(0.45, "rgba(0,0,0,.55)");
  overlay.addColorStop(1, "rgba(0,0,0,.72)");

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

  ctx.shadowColor = "#FF2D75";
  ctx.shadowBlur = 40;

  ctx.drawImage(logo, 45, 25, 215, 215);

  ctx.restore();

  // ===========================
  // Red Neon Corners
  // ===========================

  ctx.save();

  ctx.strokeStyle = "#FF2D75";

  ctx.lineWidth = 5;

  ctx.shadowColor = "#FF2D75";

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

  panelGradient.addColorStop(0, "rgba(25,18,30,.60)");

  panelGradient.addColorStop(1, "rgba(10,5,15,.40)");

  ctx.fillStyle = panelGradient;

  roundRect(ctx, 560, 120, 800, 560, 28);

  ctx.fill();

  ctx.strokeStyle = "rgba(255,45,117,.35)";

  ctx.lineWidth = 2;

  ctx.stroke();

  ctx.restore();

  // ===========================
  // HUD Lines
  // ===========================

  ctx.save();

  ctx.strokeStyle = "rgba(255,45,117,.25)";

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

  avatarGlow.addColorStop(0, "rgba(255,45,117,.55)");
  avatarGlow.addColorStop(0.3, "rgba(255,45,117,.22)");
  avatarGlow.addColorStop(0.65, "rgba(255,45,117,.10)");
  avatarGlow.addColorStop(1, "rgba(255,45,117,0)");

  ctx.fillStyle = avatarGlow;

  ctx.beginPath();
  ctx.arc(960, 280, 220, 0, Math.PI * 2);
  ctx.fill();

  // ===========================
  // Avatar Neon Rings
  // ===========================

  ctx.save();

  ctx.shadowColor = "#FF2D75";
  ctx.shadowBlur = 45;

  // Outer Ring

  ctx.beginPath();
  ctx.arc(960, 280, 145, 0, Math.PI * 2);
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#FFFFFF";
  ctx.stroke();

  // Middle Ring

  ctx.beginPath();
  ctx.arc(960, 280, 132, 0, Math.PI * 2);
  ctx.lineWidth = 8;
  ctx.strokeStyle = "#FF2D75";
  ctx.stroke();

  // Inner Ring

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

  ctx.strokeStyle = "rgba(255,45,117,.35)";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.arc(960, 280, 160, Math.PI * 1.15, Math.PI * 1.75);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(960, 280, 160, Math.PI * 0.1, Math.PI * 0.45);
  ctx.stroke();

  ctx.restore();

  // ===========================
  // HUD Accent Dots
  // ===========================

  ctx.save();

  ctx.fillStyle = "#FF2D75";

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

  ctx.restore();

  // ===========================
  // Side HUD Lines
  // ===========================

  ctx.save();

  ctx.strokeStyle = "rgba(255,45,117,.30)";
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
  // Goodbye Title
  // ===========================

  neonText(
    ctx,
    `GOODBYE FROM ${config.serverName.toUpperCase()}`,
    960,
    470,
    58,
    "#FFFFFF",
    35,
  );

  // ===========================
  // Red Underline
  // ===========================

  ctx.save();

  ctx.strokeStyle = "#FF2D75";
  ctx.lineWidth = 3;
  ctx.shadowColor = "#FF2D75";
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
    "#FF9EC7",
    20,
    "Rajdhani",
  );

  // ===========================
  // Remaining Member Count
  // ===========================

  ctx.save();

  ctx.font = "30px Rajdhani";
  ctx.textAlign = "center";
  ctx.fillStyle = "#FFFFFF";

  ctx.fillText(`Members Remaining: ${member.guild.memberCount}`, 960, 605);

  ctx.restore();

  // ===========================
  // Goodbye Message
  // ===========================

  ctx.save();

  ctx.font = "26px Rajdhani";
  ctx.textAlign = "center";
  ctx.fillStyle = "#FFD8E7";

  ctx.fillText("Thanks for being part of our community.", 960, 645);

  ctx.fillText("We hope to see you again soon!", 960, 680);

  ctx.restore();

  // ===========================
  // Decorative Divider
  // ===========================

  ctx.save();

  ctx.strokeStyle = "rgba(255,45,117,.30)";
  ctx.lineWidth = 2;

  // Left

  ctx.beginPath();
  ctx.moveTo(610, 720);
  ctx.lineTo(845, 720);
  ctx.stroke();

  // Right

  ctx.beginPath();
  ctx.moveTo(1075, 720);
  ctx.lineTo(1310, 720);
  ctx.stroke();

  ctx.restore();

  // ===========================
  // Divider Dots
  // ===========================

  ctx.save();

  ctx.fillStyle = "#FF2D75";

  [
    [845, 720],
    [1075, 720],
  ].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();

  // ===========================
  // System Status
  // ===========================

  ctx.save();

  ctx.font = "20px Rajdhani";
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255,255,255,.65)";

  ctx.fillText("SYSTEM STATUS : DISCONNECTED", 960, 760);

  ctx.restore();
  // ===========================
  // Footer Buttons
  // ===========================

  const footerY = 790;
  const boxWidth = 270;
  const boxHeight = 60;
  const gap = 35;

  const totalWidth = boxWidth * 3 + gap * 2;
  const startX = (canvas.width - totalWidth) / 2;

  const footerItems = ["❤️ Thank You", "👋 Come Back Soon", "🎮 GAME ZONE"];

  footerItems.forEach((text, index) => {
    const x = startX + index * (boxWidth + gap);

    ctx.save();

    const buttonGradient = ctx.createLinearGradient(
      x,
      footerY,
      x,
      footerY + boxHeight,
    );

    buttonGradient.addColorStop(0, "rgba(35,15,25,.70)");

    buttonGradient.addColorStop(1, "rgba(15,5,10,.45)");

    ctx.fillStyle = buttonGradient;

    ctx.strokeStyle = "#FF2D75";
    ctx.lineWidth = 2;

    ctx.shadowColor = "#FF2D75";
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

    ctx.fillStyle = `rgba(255,45,117,${Math.random() * 0.3})`;

    ctx.arc(px, py, radius, 0, Math.PI * 2);

    ctx.fill();
  }

  ctx.restore();

  // ===========================
  // Bottom Glow Line
  // ===========================

  ctx.save();

  const glow = ctx.createLinearGradient(560, 930, 1360, 930);

  glow.addColorStop(0, "rgba(255,45,117,0)");

  glow.addColorStop(0.5, "rgba(255,45,117,.90)");

  glow.addColorStop(1, "rgba(255,45,117,0)");

  ctx.strokeStyle = glow;
  ctx.lineWidth = 3;

  ctx.shadowColor = "#FF2D75";
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

module.exports = createGoodbyeCard;

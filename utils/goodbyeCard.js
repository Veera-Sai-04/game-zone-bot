const { createCanvas, loadImage } = require("@napi-rs/canvas");

const {
  WIDTH,
  HEIGHT,
  assets,
  avatar,
  logo,
  title,
  username,
  member,
} = require("./theme");

async function drawAvatar(ctx, url, x, y, size) {
  const img = await loadImage(url);

  ctx.save();

  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, size / 2 - 10, 0, Math.PI * 2);

  ctx.closePath();
  ctx.clip();

  const scale = Math.max(size / img.width, size / img.height);

  const w = img.width * scale;
  const h = img.height * scale;

  ctx.drawImage(img, x + (size - w) / 2, y + (size - h) / 2, w, h);

  ctx.restore();
}

async function createGoodbyeCard(member) {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");

  const bg = await loadImage(assets.background);
  const overlay = await loadImage(assets.overlay);
  const corners = await loadImage(assets.corners);
  const frame = await loadImage(assets.frame);
  const glow = await loadImage(assets.glow);
  const logoImg = await loadImage(assets.logo);

  // Background
  ctx.drawImage(bg, 0, 0, WIDTH, HEIGHT);

  // Red Glow
  ctx.save();
  ctx.globalAlpha = 0.85;
  ctx.filter = "hue-rotate(180deg)";
  ctx.drawImage(glow, avatar.x - 130, avatar.y - 120, 570, 570);
  ctx.restore();

  // Avatar
  await drawAvatar(
    ctx,
    member.user.displayAvatarURL({
      extension: "png",
      size: 1024,
    }),
    avatar.x,
    avatar.y,
    avatar.size,
  );

  // Frame
  ctx.drawImage(frame, avatar.x - 25, avatar.y - 25, 360, 360);

  // Overlay
  ctx.drawImage(overlay, 0, 0, WIDTH, HEIGHT);

  // Corners
  ctx.globalAlpha = 0.8;
  ctx.drawImage(corners, 0, 0, WIDTH, HEIGHT);
  ctx.globalAlpha = 1;

  // Logo
  ctx.drawImage(logoImg, logo.x, logo.y, logo.size, logo.size);

  // Title
  ctx.save();

  ctx.font = "bold 120px Orbitron";
  ctx.fillStyle = "#ff3b6b";
  ctx.shadowColor = "#ff3b6b";
  ctx.shadowBlur = 45;

  ctx.fillText("GOODBYE", title.x, title.y);

  ctx.font = "bold 58px Orbitron";
  ctx.fillStyle = "#ff82d1";
  ctx.shadowBlur = 25;

  ctx.fillText("SEE YOU AGAIN", title.x, title.y + 95);

  ctx.restore();

  // Username
  ctx.font = "bold 76px Rajdhani";
  ctx.fillStyle = "#FFFFFF";

  ctx.fillText(member.user.username, username.x, username.y);

  // Member count
  ctx.font = "44px Rajdhani";
  ctx.fillStyle = "#CFCFCF";

  ctx.fillText(
    `Members Remaining : ${member.guild.memberCount}`,
    member.x,
    member.y,
  );

  // Bottom Panel
  ctx.save();

  ctx.globalAlpha = 0.15;
  ctx.fillStyle = "#ff3b6b";

  ctx.fillRect(540, 660, 700, 150);

  ctx.strokeStyle = "#ff3b6b";
  ctx.lineWidth = 3;

  ctx.strokeRect(540, 660, 700, 150);

  ctx.restore();

  // Goodbye Message
  ctx.font = "44px Rajdhani";
  ctx.fillStyle = "#FFFFFF";

  ctx.fillText("Thanks for being part of GAME ZONE!", 580, 730);

  ctx.font = "34px Rajdhani";
  ctx.fillStyle = "#CFCFCF";

  ctx.fillText("We hope to see you again soon.", 580, 780);

  return canvas.encode("png");
}

module.exports = createGoodbyeCard;

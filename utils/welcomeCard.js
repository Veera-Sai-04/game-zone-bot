const { createCanvas, loadImage } = require("@napi-rs/canvas");

const {
  WIDTH,
  HEIGHT,
  assets,
  colors,
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

async function drawGlow(ctx) {
  const glow = await loadImage(assets.glow);

  ctx.globalAlpha = 0.85;

  ctx.drawImage(glow, avatar.x - 130, avatar.y - 120, 570, 570);

  ctx.globalAlpha = 1;
}

async function drawFrame(ctx) {
  const frame = await loadImage(assets.frame);

  ctx.drawImage(frame, avatar.x - 25, avatar.y - 25, 360, 360);
}

async function drawBackground(ctx) {
  const bg = await loadImage(assets.background);

  ctx.drawImage(bg, 0, 0, WIDTH, HEIGHT);
}

async function drawOverlay(ctx) {
  const overlay = await loadImage(assets.overlay);

  ctx.drawImage(overlay, 0, 0, WIDTH, HEIGHT);
}

async function drawCorners(ctx) {
  const img = await loadImage(assets.corners);

  ctx.globalAlpha = 0.8;

  ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);

  ctx.globalAlpha = 1;
}

async function drawLogo(ctx) {
  const img = await loadImage(assets.logo);

  ctx.drawImage(img, logo.x, logo.y, logo.size, logo.size);
}
function neonText(ctx, text, font, color, x, y, blur) {
  ctx.save();

  ctx.font = font;

  ctx.fillStyle = color;

  ctx.shadowColor = color;
  ctx.shadowBlur = blur;

  ctx.fillText(text, x, y);

  ctx.restore();
}

function smallText(ctx, text, x, y) {
  ctx.font = "44px Rajdhani";

  ctx.fillStyle = colors.gray;

  ctx.fillText(text, x, y);
}
async function createWelcomeCard(member) {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");

  await drawBackground(ctx);

  await drawGlow(ctx);

  await drawAvatar(
    ctx,
    member.displayAvatarURL({
      extension: "png",
      size: 1024,
    }),
    avatar.x,
    avatar.y,
    avatar.size,
  );

  await drawFrame(ctx);

  await drawOverlay(ctx);

  await drawCorners(ctx);

  await drawLogo(ctx);

  neonText(
    ctx,
    "WELCOME",
    "bold 120px Orbitron",
    colors.blue,
    title.x,
    title.y,
    40,
  );

  neonText(
    ctx,
    "TO GAME ZONE",
    "bold 58px Orbitron",
    colors.pink,
    title.x,
    title.y + 95,
    28,
  );

  ctx.font = "bold 76px Rajdhani";
  ctx.fillStyle = colors.white;
  ctx.fillText(member.user.username, username.x, username.y);

  smallText(ctx, `Member #${member.guild.memberCount}`, member.x, member.y);

  ctx.save();

  ctx.globalAlpha = 0.15;

  ctx.fillStyle = colors.blue;

  ctx.fillRect(540, 660, 650, 150);

  ctx.restore();

  ctx.save();

  ctx.strokeStyle = "rgba(0,234,255,.45)";
  ctx.lineWidth = 3;

  ctx.strokeRect(540, 660, 650, 150);

  ctx.restore();

  ctx.font = "44px Rajdhani";

  ctx.fillStyle = colors.white;

  ctx.fillText("Enjoy your stay and have fun!", 580, 730);

  ctx.fillStyle = colors.gray;

  ctx.font = "34px Rajdhani";

  ctx.fillText("Read the rules • Pick your roles • Start chatting", 580, 780);

  return canvas.encode("png");
}

module.exports = createWelcomeCard;

const { createCanvas, loadImage } = require("@napi-rs/canvas");

const path = require("path");

const WIDTH = 1920;
const HEIGHT = 720;

const BACKGROUND = path.join(__dirname, "../assets/background.png");
const FRAME = path.join(__dirname, "../assets/logo.png");

function drawCircularImage(ctx, image, x, y, size) {
  ctx.save();

  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);

  ctx.closePath();
  ctx.clip();

  ctx.drawImage(image, x, y, size, size);

  ctx.restore();
}

function fitText(ctx, text, maxWidth, startSize) {
  let size = startSize;

  do {
    ctx.font = `bold ${size}px Arial`;

    if (ctx.measureText(text).width <= maxWidth) break;

    size--;
  } while (size > 20);

  return size;
}

async function createGoodbyeCard(member) {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  const background = await loadImage(BACKGROUND);
  const frame = await loadImage(FRAME);

  const avatar = await loadImage(
    member.displayAvatarURL({
      extension: "png",
      size: 1024,
      forceStatic: true,
    }),
  );

  ctx.drawImage(background, 0, 0, WIDTH, HEIGHT);

  const frameWidth = 310;
  const frameHeight = 310;

  const frameX = 1265;
  const frameY = 180;

  drawCircularImage(ctx, avatar, frameX + 30, frameY + 30, 250);

  ctx.drawImage(frame, frameX, frameY, frameWidth, frameHeight);

  // GOODBYE TITLE

  ctx.save();

  ctx.shadowColor = "#ff3b3b";
  ctx.shadowBlur = 30;

  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";

  ctx.font = "bold 74px Arial";

  ctx.fillText("GOODBYE", frameX + frameWidth / 2, 110);

  ctx.restore();

  // SERVER

  ctx.fillStyle = "#ff5d5d";
  ctx.font = "bold 34px Arial";

  ctx.fillText("GAME ZONE", frameX + frameWidth / 2, 155);

  // USERNAME

  const username = member.user.username;

  const size = fitText(ctx, username, 500, 54);

  ctx.fillStyle = "#ffffff";
  ctx.font = `bold ${size}px Arial`;

  ctx.fillText(username, frameX + frameWidth / 2, frameY + frameHeight + 70);

  // MEMBER COUNT

  ctx.fillStyle = "#d0d0d0";
  ctx.font = "30px Arial";

  ctx.fillText(
    `Member #${member.guild.memberCount}`,
    frameX + frameWidth / 2,
    frameY + frameHeight + 120,
  );

  // MESSAGE

  ctx.fillStyle = "#999999";
  ctx.font = "24px Arial";

  ctx.fillText(
    "We'll miss you!",
    frameX + frameWidth / 2,
    frameY + frameHeight + 165,
  );

  return canvas.encode("png");
}

module.exports = createGoodbyeCard;

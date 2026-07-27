const { createCanvas, loadImage } = require("@napi-rs/canvas");

const path = require("path");

/**
 * -----------------------------------------
 * Canvas Settings
 * -----------------------------------------
 */

const WIDTH = 1920;
const HEIGHT = 720;

/**
 * -----------------------------------------
 * Asset Paths
 * -----------------------------------------
 */

const BACKGROUND = path.join(__dirname, "../assets/background.png");

const FRAME = path.join(__dirname, "../assets/logo.png");

/**
 * -----------------------------------------
 * Helper
 * -----------------------------------------
 */

function drawCircularImage(ctx, image, x, y, size) {
  ctx.save();

  ctx.beginPath();

  ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);

  ctx.closePath();

  ctx.clip();

  ctx.drawImage(image, x, y, size, size);

  ctx.restore();
}

/**
 * -----------------------------------------
 * Auto Font Size
 * -----------------------------------------
 */

function fitText(ctx, text, maxWidth, startSize, font = "Arial") {
  let size = startSize;

  do {
    ctx.font = `bold ${size}px ${font}`;

    if (ctx.measureText(text).width <= maxWidth) break;

    size--;
  } while (size > 20);

  return size;
}

/**
 * -----------------------------------------
 * Welcome Card
 * -----------------------------------------
 */

async function createWelcomeCard(member) {
  const canvas = createCanvas(WIDTH, HEIGHT);

  const ctx = canvas.getContext("2d");

  /**
   * Enable High Quality
   */

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  /**
   * Load Assets
   */

  const background = await loadImage(BACKGROUND);

  const frame = await loadImage(FRAME);

  /**
   * Discord Avatar
   */

  const avatarURL = member.displayAvatarURL({
    extension: "png",
    size: 1024,
    forceStatic: true,
  });

  const avatar = await loadImage(avatarURL);

  /**
   * Draw Background
   */

  ctx.drawImage(background, 0, 0, WIDTH, HEIGHT);

  /**
   * Right Side Layout
   */

  const frameWidth = 310;
  const frameHeight = 310;

  const frameX = 1265;
  const frameY = 180;

  /**
   * Avatar
   */

  drawCircularImage(ctx, avatar, frameX + 30, frameY + 30, 250);

  /**
   * Neon Frame
   */

  ctx.drawImage(frame, frameX, frameY, frameWidth, frameHeight);
  /**
   * -----------------------------------------
   * WELCOME Title
   * -----------------------------------------
   */

  ctx.save();

  ctx.shadowColor = "#00eaff";
  ctx.shadowBlur = 30;

  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";

  ctx.font = "bold 74px Arial";

  ctx.fillText("WELCOME", frameX + frameWidth / 2, 110);

  ctx.restore();

  /**
   * -----------------------------------------
   * Server Name
   * -----------------------------------------
   */

  ctx.fillStyle = "#00eaff";
  ctx.font = "bold 34px Arial";

  ctx.fillText("GAME ZONE", frameX + frameWidth / 2, 155);

  /**
   * -----------------------------------------
   * Username
   * -----------------------------------------
   */

  const username = member.user.username;

  const usernameSize = fitText(ctx, username, 500, 54);

  ctx.fillStyle = "#ffffff";
  ctx.font = `bold ${usernameSize}px Arial`;

  ctx.fillText(username, frameX + frameWidth / 2, frameY + frameHeight + 70);

  /**
   * -----------------------------------------
   * Member Count
   * -----------------------------------------
   */

  ctx.fillStyle = "#d0d0d0";
  ctx.font = "30px Arial";

  ctx.fillText(
    `Member #${member.guild.memberCount}`,
    frameX + frameWidth / 2,
    frameY + frameHeight + 120,
  );

  /**
   * -----------------------------------------
   * Small Welcome Text
   * -----------------------------------------
   */

  ctx.fillStyle = "#8b8b8b";
  ctx.font = "24px Arial";

  ctx.fillText(
    "Welcome to the community!",
    frameX + frameWidth / 2,
    frameY + frameHeight + 165,
  );

  /**
   * -----------------------------------------
   * Return PNG Buffer
   * -----------------------------------------
   */

  return canvas.encode("png");
}

module.exports = createWelcomeCard;

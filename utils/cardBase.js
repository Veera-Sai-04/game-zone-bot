// const { createCanvas, loadImage } = require("@napi-rs/canvas");

// const { WIDTH, HEIGHT, colors, assets, layout } = require("./theme");

// async function drawBackground(ctx) {
//   const bg = await loadImage(assets.background);

//   ctx.drawImage(bg, 0, 0, WIDTH, HEIGHT);
// }

// async function drawLogo(ctx) {
//   const logo = await loadImage(assets.logo);

//   ctx.drawImage(
//     logo,
//     layout.logo.x,
//     layout.logo.y,
//     layout.logo.size,
//     layout.logo.size,
//   );
// }

// async function drawGlow(ctx, theme) {
//   const glow = await loadImage(assets.glow);

//   ctx.save();

//   ctx.globalAlpha = 0.85;

//   ctx.drawImage(
//     glow,

//     layout.avatar.x - 110,

//     layout.avatar.y - 110,

//     500,

//     500,
//   );

//   ctx.restore();
// }

// async function drawFrame(ctx) {
//   const frame = await loadImage(assets.frame);

//   ctx.drawImage(
//     frame,

//     layout.avatar.x - 15,

//     layout.avatar.y - 15,

//     layout.avatar.size + 30,

//     layout.avatar.size + 30,
//   );
// }

// async function drawAvatar(ctx, avatarURL) {
//   const avatar = await loadImage(avatarURL);

//   const size = layout.avatar.size;

//   const x = layout.avatar.x;

//   const y = layout.avatar.y;

//   ctx.save();

//   ctx.beginPath();

//   ctx.arc(
//     x + size / 2,

//     y + size / 2,

//     size / 2,

//     0,

//     Math.PI * 2,
//   );

//   ctx.closePath();

//   ctx.clip();

//   const scale = Math.max(
//     size / avatar.width,

//     size / avatar.height,
//   );

//   const w = avatar.width * scale;

//   const h = avatar.height * scale;

//   ctx.drawImage(
//     avatar,

//     x + (size - w) / 2,

//     y + (size - h) / 2,

//     w,

//     h,
//   );

//   ctx.restore();
// }

// function neonText(ctx, text, font, color, x, y, blur) {
//   ctx.save();

//   ctx.font = font;

//   ctx.fillStyle = color;

//   ctx.shadowColor = color;

//   ctx.shadowBlur = blur;

//   ctx.fillText(text, x, y);

//   ctx.restore();
// }
// async function drawGlassPanel(ctx) {
//   ctx.save();

//   const x = layout.panel.x;
//   const y = layout.panel.y;
//   const w = layout.panel.width;
//   const h = layout.panel.height;
//   const r = 28;

//   ctx.beginPath();

//   ctx.moveTo(x + r, y);
//   ctx.lineTo(x + w - r, y);
//   ctx.quadraticCurveTo(x + w, y, x + w, y + r);

//   ctx.lineTo(x + w, y + h - r);
//   ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);

//   ctx.lineTo(x + r, y + h);
//   ctx.quadraticCurveTo(x, y + h, x, y + h - r);

//   ctx.lineTo(x, y + r);
//   ctx.quadraticCurveTo(x, y, x + r, y);

//   ctx.closePath();

//   ctx.fillStyle = "rgba(8,18,35,.55)";
//   ctx.fill();

//   ctx.lineWidth = 2;

//   ctx.strokeStyle = "rgba(0,255,255,.35)";
//   ctx.stroke();

//   ctx.restore();
// }

// function drawHud(ctx) {
//   ctx.save();

//   ctx.strokeStyle = "rgba(0,255,255,.35)";
//   ctx.lineWidth = 2;

//   //---------------- Top

//   ctx.beginPath();

//   ctx.moveTo(1060, 140);
//   ctx.lineTo(1750, 140);

//   ctx.stroke();

//   //---------------- Bottom

//   ctx.beginPath();

//   ctx.moveTo(1060, 925);
//   ctx.lineTo(1750, 925);

//   ctx.stroke();

//   //---------------- Left

//   ctx.beginPath();

//   ctx.moveTo(1060, 140);
//   ctx.lineTo(1060, 925);

//   ctx.stroke();

//   //---------------- Right

//   ctx.beginPath();

//   ctx.moveTo(1750, 140);
//   ctx.lineTo(1750, 925);

//   ctx.stroke();

//   //---------------- Decorative Lines

//   for (let i = 0; i < 7; i++) {
//     const yy = 220 + i * 82;

//     ctx.beginPath();

//     ctx.moveTo(1085, yy);
//     ctx.lineTo(1140, yy);

//     ctx.stroke();
//   }

//   for (let i = 0; i < 7; i++) {
//     const yy = 220 + i * 82;

//     ctx.beginPath();

//     ctx.moveTo(1670, yy);
//     ctx.lineTo(1725, yy);

//     ctx.stroke();
//   }

//   ctx.restore();
// }

// function drawTitle(ctx, type) {
//   const title = type === "welcome" ? "WELCOME" : "GOODBYE";

//   neonText(
//     ctx,

//     title,

//     "90px Orbitron",

//     "#4cf7ff",

//     1180,

//     205,

//     40,
//   );
// }

// function drawUsername(ctx, username) {
//   neonText(
//     ctx,

//     username,

//     "58px Rajdhani",

//     "#ffffff",

//     1260,

//     495,

//     18,
//   );
// }

// function drawServerName(ctx, guild) {
//   ctx.save();

//   ctx.font = "30px Rajdhani";

//   ctx.fillStyle = "#85f5ff";

//   ctx.fillText(
//     guild,

//     1260,

//     448,
//   );

//   ctx.restore();
// }

// function drawMemberCount(ctx, count) {
//   ctx.save();

//   ctx.font = "34px Rajdhani";

//   ctx.fillStyle = "#8dc9ff";

//   ctx.fillText(
//     `${count} MEMBERS`,

//     1260,

//     560,
//   );

//   ctx.restore();
// }

// function drawDivider(ctx) {
//   ctx.save();

//   ctx.strokeStyle = "rgba(0,255,255,.45)";

//   ctx.lineWidth = 2;

//   ctx.beginPath();

//   ctx.moveTo(1260, 585);

//   ctx.lineTo(1685, 585);

//   ctx.stroke();

//   ctx.restore();
// }
// function drawInfoBox(ctx, type) {
//   const x = layout.panel.x + 45;
//   const y = layout.panel.y + 45;
//   const w = layout.panel.width - 90;
//   const h = layout.panel.height - 90;

//   ctx.save();

//   ctx.beginPath();
//   ctx.moveTo(x + 20, y);
//   ctx.lineTo(x + w - 20, y);
//   ctx.quadraticCurveTo(x + w, y, x + w, y + 20);
//   ctx.lineTo(x + w, y + h - 20);
//   ctx.quadraticCurveTo(x + w, y + h, x + w - 20, y + h);
//   ctx.lineTo(x + 20, y + h);
//   ctx.quadraticCurveTo(x, y + h, x, y + h - 20);
//   ctx.lineTo(x, y + 20);
//   ctx.quadraticCurveTo(x, y, x + 20, y);
//   ctx.closePath();

//   ctx.fillStyle = "rgba(0,0,0,.22)";
//   ctx.fill();

//   ctx.strokeStyle = "rgba(0,255,255,.18)";
//   ctx.lineWidth = 2;
//   ctx.stroke();

//   ctx.restore();

//   ctx.save();

//   ctx.font = "28px Rajdhani";
//   ctx.fillStyle = "#73f7ff";

//   ctx.fillText("SYSTEM STATUS", x + 25, y + 45);

//   ctx.font = "22px Rajdhani";
//   ctx.fillStyle = "#d4ffff";

//   const lines =
//     type === "welcome"
//       ? [
//           "Identity Verified",
//           "Access Granted",
//           "Voice Channel Ready",
//           "Enjoy Your Stay",
//         ]
//       : [
//           "User Disconnected",
//           "Session Closed",
//           "Resources Released",
//           "See You Again",
//         ];

//   let yy = y + 95;

//   for (const line of lines) {
//     ctx.fillText("▸ " + line, x + 30, yy);

//     yy += 42;
//   }

//   ctx.restore();
// }

// function drawBottomBar(ctx) {
//   ctx.save();

//   const x = layout.panel.x;
//   const y = layout.panel.y + layout.panel.height + 28;

//   ctx.strokeStyle = "rgba(0,255,255,.45)";
//   ctx.lineWidth = 3;

//   ctx.beginPath();
//   ctx.moveTo(x, y);
//   ctx.lineTo(x + layout.panel.width, y);
//   ctx.stroke();

//   ctx.restore();
// }

// function drawCorners(ctx) {
//   ctx.save();

//   ctx.strokeStyle = "rgba(0,255,255,.45)";
//   ctx.lineWidth = 3;

//   // top left
//   ctx.beginPath();
//   ctx.moveTo(1060, 140);
//   ctx.lineTo(1110, 140);
//   ctx.lineTo(1110, 190);
//   ctx.stroke();

//   // top right
//   ctx.beginPath();
//   ctx.moveTo(1750, 140);
//   ctx.lineTo(1700, 140);
//   ctx.lineTo(1700, 190);
//   ctx.stroke();

//   // bottom left
//   ctx.beginPath();
//   ctx.moveTo(1060, 925);
//   ctx.lineTo(1110, 925);
//   ctx.lineTo(1110, 875);
//   ctx.stroke();

//   // bottom right
//   ctx.beginPath();
//   ctx.moveTo(1750, 925);
//   ctx.lineTo(1700, 925);
//   ctx.lineTo(1700, 875);
//   ctx.stroke();

//   ctx.restore();
// }

// async function renderCard({
//   avatarURL,
//   username,
//   guildName,
//   memberCount,
//   type,
// }) {
//   const canvas = createCanvas(WIDTH, HEIGHT);

//   const ctx = canvas.getContext("2d");

//   await drawBackground(ctx);

//   drawHud(ctx);

//   drawCorners(ctx);

//   await drawGlow(ctx, type);

//   await drawAvatar(ctx, avatarURL);

//   await drawFrame(ctx);

//   await drawLogo(ctx);

//   drawTitle(ctx, type);

//   drawServerName(ctx, guildName);

//   drawUsername(ctx, username);

//   drawMemberCount(ctx, memberCount);

//   drawDivider(ctx);

//   await drawGlassPanel(ctx);

//   drawInfoBox(ctx, type);

//   drawBottomBar(ctx);

//   return canvas.encode("png");
// }

// module.exports = {
//   renderCard,
// };

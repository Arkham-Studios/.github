import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

import { createCanvas, loadImage } from "canvas";
import axios from "axios";

const canvas = createCanvas(1920 / 3, 1080 / 3);
const ctx = canvas.getContext("2d");

(async function () {
  const server = await axios
    .get(
      "https://bedrock-ping.vercel.app/api/ping?hostname=play.arkhamstudios.net"
    )
    .then((response) => response.data);
  const background = await loadImage("./.github/background.jpg");
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.font = "1em sans-serif";
  ctx.fillStyle = "#fea81c";
  ctx.textAlign = "right";
  ctx.textBaseline = "bottom";
  ctx.fillText(
    `${server.online}/${server.serverSlots}`,
    canvas.width - 10,
    canvas.height - 10
  );

  const pngData = await canvas.toBuffer("image/png");
  const pngPath = join(process.cwd(), "dist/banner.png");

  mkdirSync("dist");
  writeFileSync(pngPath, pngData);
})();

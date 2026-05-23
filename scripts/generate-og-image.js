const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const SITE_URL = process.env.SITE_URL || "https://beingmohamedhafez.com";
const OUTPUT_PATH = path.join(__dirname, "..", "public", "opengraph-image.png");

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

  await page.goto(SITE_URL, { waitUntil: "networkidle2" });

  // Wait for the hero video element to appear
  await page.waitForSelector("video", { timeout: 10000 });

  // Wait for the video to actually start playing
  await page.evaluate(() => {
    return new Promise((resolve) => {
      const video = document.querySelector("video");
      if (!video) return resolve();
      if (video.readyState >= 2 && !video.paused) return resolve();
      video.addEventListener("playing", resolve, { once: true });
      // Fallback: resolve after 3s regardless
      setTimeout(resolve, 3000);
    });
  });

  // Extra wait for any fade-in animations to settle
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Scroll to top to ensure hero is fully in view
  await page.evaluate(() => window.scrollTo(0, 0));

  // Screenshot only the hero element (first section #about)
  const heroElement = await page.$("section#about");
  if (!heroElement) {
    throw new Error("Hero section #about not found");
  }

  const dir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  await heroElement.screenshot({
    path: OUTPUT_PATH,
    type: "png",
  });

  await browser.close();

  const stats = fs.statSync(OUTPUT_PATH);
  console.log(`OG image saved: ${OUTPUT_PATH} (${(stats.size / 1024).toFixed(1)} KB)`);
})();

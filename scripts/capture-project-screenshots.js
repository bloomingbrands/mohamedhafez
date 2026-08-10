const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const OUT_DIR = path.join(__dirname, "..", "public", "projects");

const projects = [
  {
    slug: "ontarget-brands",
    url: "https://ontargeterp.netlify.app",
  },
  {
    slug: "blooming-brands",
    url: "https://blooming-brands.com",
  },
  {
    slug: "nodes-unlimited",
    url: "https://nodesunlimited.com",
  },
  {
    slug: "prestige-worldwide-limos",
    url: "https://www.prestigeworldwidelimos.com",
  },
];

async function dismissConsent(page) {
  return page.evaluate(() => {
    const labels = ["accept", "agree", "got it", "allow all", "accept all"];
    const buttons = Array.from(
      document.querySelectorAll("button, a, [role='button']")
    );
    for (const el of buttons) {
      const t = (el.textContent || "").trim().toLowerCase();
      if (labels.some((l) => t === l || t.includes(l))) {
        el.click();
        return t;
      }
    }
    return null;
  });
}

(async () => {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  const systemChrome =
    process.env.CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: fs.existsSync(systemChrome) ? systemChrome : undefined,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  for (const project of projects) {
    const outPath = path.join(OUT_DIR, `${project.slug}.png`);
    console.log(`Capturing ${project.url} → ${outPath}`);

    try {
      await page.goto(project.url, {
        waitUntil: "networkidle2",
        timeout: 60000,
      });
      // Let hero animations / fonts settle
      await new Promise((r) => setTimeout(r, 2000));
      const consent = await dismissConsent(page);
      if (consent) {
        console.log(`  dismissed consent: ${consent}`);
        await new Promise((r) => setTimeout(r, 1200));
      }
      await page.evaluate(() => window.scrollTo(0, 0));

      await page.screenshot({
        path: outPath,
        type: "png",
        fullPage: false,
      });

      const stats = fs.statSync(outPath);
      console.log(`  saved ${(stats.size / 1024).toFixed(1)} KB`);
    } catch (err) {
      console.error(`  FAILED ${project.slug}:`, err.message);
    }
  }

  await browser.close();
  console.log("Done.");
})();

const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  if (!fs.existsSync('./public/showcases')) {
    fs.mkdirSync('./public/showcases');
  }

  // Scroll to the process section
  await page.evaluate(() => {
    document.querySelector('.ps-section-root')?.scrollIntoView();
  });
  
  // Wait for animations
  await new Promise(r => setTimeout(r, 2000));

  const names = ['discover', 'design', 'build', 'launch'];
  const elements = await page.$$('.ps-showcase-inner');

  for (let i = 0; i < elements.length; i++) {
    if (names[i]) {
      // Force opacity 1 just in case
      await page.evaluate((el) => {
        el.parentElement.style.opacity = '1';
        el.parentElement.style.transform = 'none';
      }, elements[i]);
      
      await elements[i].screenshot({ path: `./public/showcases/${names[i]}.webp`, type: 'webp' });
      console.log(`Saved ${names[i]}.webp`);
    }
  }

  await browser.close();
})();


const puppeteer = require('puppeteer');

(async () => {
const browser = await puppeteer.launch({headless: false, defaultViewport: null});
const page = await browser.newPage();
await page.goto('http://localhost:8080/login');
const checkoutBtn = (await page.$x('//button[contains(text(),"Checkout")]'))[0];
await emailInput.evaluate(e => e.disabled = true);
browser.close();
})();

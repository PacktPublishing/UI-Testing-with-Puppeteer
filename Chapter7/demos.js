
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false, defaultViewport: null});
    const page = await browser.newPage();
    const counter = await page.evaluateHandle(() => {
        window.counter = { count: 2 };
        return window.counter;
    });

    await counter.evaluate((counter, inc) => counter.count += inc, 3);
    await page.evaluate(() => alert(window.counter.count));
})();

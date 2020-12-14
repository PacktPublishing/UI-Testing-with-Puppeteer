const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless : false, defaultViewport: null});
    const page = await browser.newPage();
    await page.emulateTimezone('Europe/London');
    await page.goto('https://www.unixtimestamp.com');
    await browser.close();
})();
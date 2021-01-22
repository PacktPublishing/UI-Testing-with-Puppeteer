const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless : false, defaultViewport: null});
    const page = await browser.newPage();
    await page.goto('https://github.com/puppeteer/puppeteer/blob/main/docs/api.md');
    await page.emulateMediaType('print');
    await page.screenshot({ path: 'print.png' });
    await browser.close();
})();
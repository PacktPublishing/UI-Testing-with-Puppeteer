const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless : false, defaultViewport: null});
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
        'Accept-Language': 'fr'
    });
    await page.goto('https://www.google.com');
    await browser.close();
})();
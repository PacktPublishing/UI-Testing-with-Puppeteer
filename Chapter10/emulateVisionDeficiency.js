const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless : false, defaultViewport: null});
    const page = await browser.newPage();
    await page.goto('https://www.packtpub.com');
    await page.emulateVisionDeficiency('achromatopsia');
    await page.screenshot({path: 'achromatopsia.png'});
    await page.emulateVisionDeficiency('blurredVision');
    await page.screenshot({path: 'blurredVision.png'});

    await browser.close();
})();
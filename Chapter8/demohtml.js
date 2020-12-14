const puppeteer = require('puppeteer');
const content = require('./contentdb');

(async () => {
    const browser = await puppeteer.launch({headless : false, defaultViewport: null});
    const page = await browser.newPage();
    await page.emulate({
        userAgent:
            'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1',
        viewport: {
            width: 360,
            height: 780,
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
    });
    await page.goto('https://www.packtpub.com');
    await page.screenshot({path: 'fromhtml.png'});
    await browser.close();
})();
const puppeteer = require('puppeteer');

(async function () {
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
        authorization: 'basic dXNlcjpwYXNzd29yZA=='
    });
    await page.goto('https://ptsv2.com/t/ui-testing-puppeteer/post');
    await page.screenshot({path : './authentication-header.png'});
    browser.close();
})();
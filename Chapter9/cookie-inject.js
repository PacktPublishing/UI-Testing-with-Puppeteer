const puppeteer = require('puppeteer');
const cookies = require('./www.packtpub.com.cookies.json');
(async function () {
    const browser = await puppeteer.launch({defaultViewport: {width: 1024, height: 1024}});
    const page = await browser.newPage();
    await page.setCookie(...cookies);
    await page.goto('https://account.packtpub.com/account/details');
    await page.waitForSelector('[autocomplete="given-name"]');
    await page.screenshot({path : './cookies.png'});
    browser.close();
})();
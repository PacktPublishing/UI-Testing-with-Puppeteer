const puppeteer = require('puppeteer');

(async function () {
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    await page.authenticate({username: 'user', password: 'password'});
    await page.goto('https://ptsv2.com/t/ui-testing-puppeteer/post');
    await page.screenshot({path : './authentication.png'});
    browser.close();
})();
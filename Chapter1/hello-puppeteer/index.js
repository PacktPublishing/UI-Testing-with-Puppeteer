const puppeteer = require('puppeteer');

(async function() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://en.wikipedia.org/wiki/%22Hello,_World!%22_program');
    await page.screenshot({ path: './screenshot.png'});
    browser.close();
})();
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

(async function () {
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    await page.goto('https://arh.antoinevastel.com/bots/areyouheadless');
    await page.screenshot({path : './bot.png'});
    browser.close();
})();
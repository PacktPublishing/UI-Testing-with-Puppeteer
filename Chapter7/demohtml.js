const puppeteer = require('puppeteer');
const content = require('./contentdb');

(async () => {
    const browser = await puppeteer.launch({headless : true, defaultViewport: null});
    const page = await browser.newPage();
    await page.setContent(content.socialPostTemplate);
    await page.screenshot({path: 'fromhtml.png'});
    await browser.close();
})();
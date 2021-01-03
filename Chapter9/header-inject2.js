const puppeteer = require('puppeteer');

(async function () {
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', r=> {
        const overrides = {
            headers: r.headers(),
        }

        if(r.url() === 'https://ptsv2.com/t/ui-testing-puppeteer/post') {
            overrides.headers.authorization = 'basic dXNlcjpwYXNzd29yZA==';
        }

        r.continue(overrides);
    });
    await page.goto('https://ptsv2.com/t/ui-testing-puppeteer/post');
    await page.screenshot({path : './authentication-header2.png'});
    browser.close();
})();
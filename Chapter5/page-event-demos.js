
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
    const page = await browser.newPage();
    page.on('response', response =>
        console.log('Response URL: ' + response.url()));

    page.on('response', response => {
        if (response.request().resourceType() === 'image') {
            console.log('Image URL: ' + response.url());
        }
    });

    const listenToImages = response => {
        if (response.request().resourceType() === 'image') {
            console.log('Image URL from function: ' + response.url());
        }
    };

    page.on('response', listenToImages);

    page.once('response', r => console.log('Response URL once: ' + r.url()));
    
    await page.goto('https://www.packtpub.com/');

    page.removeListener('response', listenToImages);
    
    browser.close();
})();

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless : false, defaultViewport: null});
    const page = await browser.newPage();
    await page.goto('https://www.packtpub.com');

    await page.screenshot({path: 'normal-only-viewport.png'});
    await page.screenshot({path: 'full-page.png', fullPage: true});
    await page.screenshot({
        path: 'clip.png',
        clip: { 
            x: 300, 
            y: 300,
            width: 286,
            height: 64
        }
    });
    const firstBook = await page.$('.tombstone');
    await firstBook.screenshot({ path:'first-book.png'});
    await browser.close();
})();
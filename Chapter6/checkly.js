const assert = require("chai").assert;
const puppeteer = require("puppeteer");

const browser = await puppeteer.launch({defaultViewport: null});
const page = await browser.newPage();
page.setDefaultTimeout(600000);
await page.goto('https://www.packtpub.com/tech/javascript/');
const cookieLink = await page.waitForSelector('.accept_all', { timeout : 1000}).catch(e => e);

if (cookieLink) {
    await cookieLink.click();
}

await Promise.all([
    page.waitForSelector('.counter.qty.empty'),
    page.waitForSelector('.add-to-cart')
]);
    
const reachedToTwo = new Promise((resolve) => {
    page.exposeFunction('notifiyCartChange', i => {
        if(i ==='2') 
            resolve();
    })
});
await page.evaluate(() => {
    let observer = new MutationObserver(list => notifiyCartChange(list[0].target.nodeValue));
    observer.observe(
        document.querySelector('.counter.qty .counter-number'), 
        {
            characterData: true, 
            attributes: false, 
            childList: false, 
            subtree: true
        });
});

const addToCartButtons = await page.$$('.add-to-cart');
await addToCartButtons[0].click();

await page.waitForFunction(async () => {
const element = document.querySelector('.block-minicart');
let currentHeight = element.getBoundingClientRect().height;
let stopMovingCounter = 0;

await new Promise((resolve) => {
    const stoppedMoving = function() {
        if (element.getAttribute('style') !== 'display: block;') {
            setTimeout(stoppedMoving, 20);
        }

        if(element.getBoundingClientRect().height > 0 && currentHeight === element.getBoundingClientRect().height) {
            stopMovingCounter++;
        } else {
            stopMovingCounter = 0;
            currentHeight = element.getBoundingClientRect().height
        }
        
        if(stopMovingCounter === 10) {
            console.log('resolve');
            resolve();
        }

        setTimeout(stoppedMoving, 20);
    };
    stoppedMoving()
});

return true;
});
await page.click('#btn-minicart-close');
await addToCartButtons[1].click();
await reachedToTwo;

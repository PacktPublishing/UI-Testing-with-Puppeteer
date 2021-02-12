const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const should = require('chai').should();
const config = require('./config');
const fs = require('fs');
var exec = require('child_process').exec;
const Path = require('path');

describe('Packpub search Test', () => {
    let browser;
    let page;
    
    before(async() => {
        browser = await puppeteer.launch({headless: false, defaultViewport: null});

    });

    beforeEach(async () => {
        page = await browser.newPage();
        page.setDefaultTimeout(config.timeout);
    })

    afterEach(async () => {
        await page.close();
    })

    after(async () => {
        await browser.close();
    })

    it('Should send geolocation', async() => {
        page.goto('https://www.packtpub.com/');
        const search = await page.waitForSelector('#search');
        await search.type('Puppeteer');

        await Promise.all([
            page.waitForNavigation(),
            search.press('Enter')
        ]);

        const textResult = await page.$eval('[data-ui-id="page-title-wrapper"]', e => e.innerText);
        expect(textResult).to.be.equal(`Search results for: 'Puppeteer'`);

    });

    it('Should update the cart number', async() => {
await page.goto('https://www.packtpub.com/tech/javascript/');
const cookieLink = await page.waitForSelector('.accept_all', { timeout : 1000}).catch(e => e);

if (cookieLink) {
    await cookieLink.click();
}

await Promise.all([
    page.waitForSelector('.counter.qty.empty'),
    page.waitForSelector('.add-to-cart')
]);

const cartIsOnePromise = page.waitForFunction(() => document.querySelector('.counter.qty .counter-number').innerText.trim() === '1');
const cartIsTwoPromise = page.waitForFunction(() => document.querySelector('.counter.qty .counter-number').innerText.trim() === '2');
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
await cartIsOnePromise;
await addToCartButtons[1].click();
await cartIsTwoPromise;
    });


it('Should update the cart number (with listeners)', async() => {
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
    });
});
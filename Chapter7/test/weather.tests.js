const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const config = require('./config');

describe('Weather Channel Test', () => {
    let browser;
    let page;
    
    before(async() => {
        browser = await puppeteer.launch(config.launchOptions);
    });

    beforeEach(async () => {
        page = await browser.newPage();
        page.setDefaultTimeout(config.timeout);
    })

    after(async () => {
        await browser.close();
    })

    it('Should send geolocation', async() => {
        const promise = page.waitForRequest(r => r.url().includes('redux-dal'));
        await page.goto('https://weather.com/');
        const request = await promise;
        const json = JSON.parse(request.postData());
        expect(json[0].params.geocode).not.be.empty;

    });
});
const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const should = require('chai').should();
const config = require('./config');
const fs = require('fs');
var exec = require('child_process').exec;
const Path = require('path');

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

    afterEach(async () => {
        await page.close().catch({});
    })

    after(async () => {
        await browser.close();
    })

    it('Should send geolocation', async() => {
        const promise = page.waitForRequest(r => r.url().includes('redux-dal'));
        page.goto('https://weather.com/');
        const request = await promise;
        const json = JSON.parse(request.postData());
        expect(json[0].params.geocode).not.be.empty;
    });

});
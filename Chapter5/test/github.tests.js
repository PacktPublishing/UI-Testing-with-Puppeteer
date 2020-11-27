const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const should = require('chai').should();
const config = require('./config');
const fs = require('fs');
var exec = require('child_process').exec;
const Path = require('path');

describe('Github Test', () => {
    let browser;
    let page;
    let pageModel;
    
    before(async() => {
        browser = await puppeteer.launch({headless: false, defaultViewport: null});

    });

    beforeEach(async () => {
        page = await browser.newPage();
        page.setDefaultTimeout(config.timeout);
        await page.goto('https://github.com/');
    })

    afterEach(async () => {
        await page.close();
    })

    after(async () => {
        await browser.close();
    })

    it('Should use shortcuts', async() => {
      await page.keyboard.press('Slash');
      await page.keyboard.type('puppeteer', {delay: 100});
      await page.keyboard.press('Enter');
    });

});
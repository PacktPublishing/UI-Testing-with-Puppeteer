const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const should = require('chai').should();
const config = require('./config');
const fs = require('fs');
var exec = require('child_process').exec;
const Path = require('path');

describe('w3Schools hover Test', () => {
    let browser;
    let page;
    let pageModel;
    
    before(async() => {
        browser = await puppeteer.launch({headless: false, defaultViewport: null});

    });

    beforeEach(async () => {
        page = await browser.newPage();
        page.setDefaultTimeout(config.timeout);
        await page.goto('https://www.w3schools.com/howto/howto_css_dropdown.asp');
    })

    afterEach(async () => {
        await page.close();
    })

    after(async () => {
        await browser.close();
    })

    it('Should hover', async() => {
      const btn = await page.$('.dropbtn');
      const box = await btn.boundingBox();
      await page.mouse.move(box.x + (box.width / 2), box.y + (box.height / 2));
      const option = (await page.$x('//*[text()="Link 2"]'))[0];
      await option.click();
    });

});
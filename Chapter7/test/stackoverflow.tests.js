const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const should = require('chai').should();
const config = require('./config');
const fs = require('fs');
var exec = require('child_process').exec;
const Path = require('path');

describe('Stackoverflow Test', () => {
    let browser;
    let page;
    
    before(async() => {
        browser = await puppeteer.launch(config.launchOptions);

    });

    beforeEach(async () => {
        page = await browser.newPage();
        page.setDefaultTimeout(config.timeout);
        await page.goto('https://stackoverflow.com/questions', {waitUntil: 'domcontentloaded'});
    })

    afterEach(async () => {
        await page.close();
    })

    after(async () => {
        await browser.close();
    })

    it('Should have categories', async() => {
        await page.waitForSelector('.jobs li');
        const jobs = await page.$$('.jobs li');
        expect(jobs).not.to.be.empty;
    });

    it('Should show jobs', async() => {
        const title = await page.waitForSelector('#hireme .header .grid--cell.fl1');
        expect(await title.evaluate(e => e.innerText)).to.contain('job');
    });
});
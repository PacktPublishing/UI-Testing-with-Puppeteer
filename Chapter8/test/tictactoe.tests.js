const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const should = require('chai').should();
const config = require('./config');
const fs = require('fs');
var exec = require('child_process').exec;
const Path = require('path');

describe('tic-tac-toe Test', () => {
    let browser;
    let page;
    let pageModel;
    
    before(async() => {
        browser = await puppeteer.launch(config.launchOptions);

    });

    beforeEach(async () => {
        page = await browser.newPage();
        page.setDefaultTimeout(config.timeout);
        await page.goto(pathToFileURL(Path.join(__dirname,  '..', 'tictactoe.html')));
    })

    afterEach(async () => {
        await page.close();
    })

    after(async () => {
        await browser.close();
    })

    it('Should Play', async() => {
      const startingX = 20;
      const startingY = 20;
      const boxMiddle = 16;

      await page.mouse.click(startingX + boxMiddle, startingY + boxMiddle);
      await page.mouse.click(startingX + boxMiddle, startingY + boxMiddle * 3);

      await page.mouse.click(startingX + boxMiddle * 3, startingY + boxMiddle);
      await page.mouse.click(startingX + boxMiddle * 3, startingY + boxMiddle * 3);

      await page.mouse.click(startingX + boxMiddle * 5, startingY + boxMiddle);

      expect(await page.$eval('#status', status => status.innerHTML)).to.be.equal('Winner: X');
    });

   function pathToFileURL(path) {
     let pathName = path.replace(/\\/g, '/');
     // Windows drive letter must be prefixed with a slash.
     if (!pathName.startsWith('/')) pathName = '/' + pathName;
     return 'file://' + pathName;
   }
});
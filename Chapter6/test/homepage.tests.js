const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const should = require('chai').should();
const LoginPageModel = require('./pom/HomePageModel.js');
const config = require('./config');
const fs = require('fs');
var exec = require('child_process').exec;
const Path = require('path');

describe('Home Page', () => {
    let browser;
    let page;
    let pageModel;
    
    before(async() => {
        browser = await puppeteer.launch(config.launchOptions);

    });

    beforeEach(async () => {
        page = await browser.newPage();
        page.setDefaultTimeout(config.timeout);
        pageModel = new LoginPageModel(page, config);
        await pageModel.go();
    })

    afterEach(async () => {
        await page.close();
    })

    after(async () => {
        await browser.close();
    })

    it('Should have right price and stock', async() => {
      (await pageModel.getPrice(config.productToTestName)).should.equal('$1199');
      (await pageModel.getStock(config.productToTestName)).should.equal('15 left in stock');
    });

    it('Should switch views', async() => {
      await pageModel.switchToView('list');
      expect(await page.$$('.list-group-item')).not.to.be.empty;
      await pageModel.switchToView('grid');
      expect(await page.$$('.list-group-item')).to.be.empty;
    });

    it('Should load all images', async() => {
      const images = (await page.evaluateHandle(() => 
        Array.from(document.querySelectorAll('IMG')).filter(e => !e.naturalWidth)));
       (await images.evaluate(e => e.length)).should.equal(0);
    });

});
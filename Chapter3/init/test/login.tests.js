const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const should = require('chai').should();
const LoginPageModel = require('./pom/LoginPageModel.js');
const config = require('./config');

describe('Login Page', () => {
    let browser;
    let page;
    let pageModel;

    before(async() => {
        browser = await puppeteer.launch({ headless:false});
    });

    beforeEach(async () => {
        page = await browser.newPage();
        pageModel = new LoginPageModel(page, config);
        await pageModel.go();
    })

    afterEach(async () => {
        await page.close();
    })

    after(async () => {
        await browser.close();
    })

    it('Should have the right title', async() => {
        (await pageModel.title()).should.equal('Login');
    });
});
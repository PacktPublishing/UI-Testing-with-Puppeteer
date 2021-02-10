const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const should = require('chai').should();
const AdminPageModel = require('./pom/AdminPageModel.js');
const config = require('./config');

describe('Admin Page', () => {
    let browser;
    let page;
    let pageModel;

    before(async () => {
        browser = await puppeteer.launch(config.launchOptions);
    });

    beforeEach(async () => {
        page = await browser.newPage();
        page.setDefaultTimeout(config.timeout);
        pageModel = new AdminPageModel(page, config);
    });

    afterEach(async () => {
        await page.close();
    });

    after(async () => {
        await browser.close();
    });
});
const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const should = require('chai').should();
const LoginPageModel = require('./pom/LoginPageModel.js');
const config = require('./config');
const fs = require('fs');
var exec = require('child_process').exec;
const Path = require('path');
const NetworkPresets = require('./networkPresets');

describe('Login Page', () => {
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

    it('Should login', async() => {
      await pageModel.login(config.username, config.password);
      await page.waitForSelector('.thumbnail.card');
    });

    it('Should login on 3G', async() => {
      await page._client.send(
        'Network.emulateNetworkConditions',
        {
          offline: false,
          downloadThroughput: 750 * 1024 / 8,
          uploadThroughput: 250 * 1024 / 8,
          latency: 100,
        }
      )
      await pageModel.login(config.username, config.password);
      await page.waitForSelector('.thumbnail.card');
    });

    it('Should have the right title', async() => {
        (await pageModel.title()).should.equal('Login');
    });

    it('It should persist the user', async() => {
        const userDataDir = fs.mkdtempSync('profile');
        const options = config.launchOptions;
        options.userDataDir =  userDataDir;
        let persistingBrowser = await puppeteer.launch(options);
        let persistentPage = await persistingBrowser.newPage();
        let loginModel = new LoginPageModel(persistentPage, config);

        await loginModel.go();
        (await loginModel.logState()).should.equal('Login');
        await loginModel.login(config.username, config.password);
        (await loginModel.logState()).should.equal('Logout');

        await persistingBrowser.close();

        persistingBrowser = await puppeteer.launch(options);
        persistentPage = await persistingBrowser.newPage();
        loginModel = new LoginPageModel(persistentPage, config);
        await loginModel.go();

        (await loginModel.logState()).should.equal('Logout');
        
        await persistingBrowser.close();
        deleteFolderRecursive(userDataDir);
    });

    it('Should load image after login', async() => {
      const promise = page.waitForResponse(config.productImage);
      await pageModel.login(config.username, config.password);
      await promise;
    });

    const deleteFolderRecursive = function(path) {
        if (fs.existsSync(path)) {
          fs.readdirSync(path).forEach((file, index) => {
            const curPath = Path.join(path, file);
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
              deleteFolderRecursive(curPath);
            } else { // delete file
              fs.unlinkSync(curPath);
            }
          });
          fs.rmdirSync(path);
        }
      };
});
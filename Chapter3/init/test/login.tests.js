const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const should = require('chai').should();
const LoginPageModel = require('./pom/LoginPageModel.js');
const config = require('./config');

describe('Login Page', () => {
    let browser;
    let page;
    let pageModel;

    before(async () => {
        browser = await puppeteer.launch({ headless: false });
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

    it('Should have the right title', async () => {
        (await pageModel.title()).should.equal('Login');
    });

    const deleteFolderRecursive = function(path) {
        try {
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
        }
        catch {
          console.log('Unabled to delete folder');
        }
      };
});
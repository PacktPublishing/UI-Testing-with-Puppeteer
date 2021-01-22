const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const LoginPageModel = require('./pom/HomePageModel.js');
const config = require('./config');
const fs = require('fs');
var exec = require('child_process').exec;
const Path = require('path');
const Differencify = require('differencify');
const differencify = new Differencify({ debug: true, mismatchThreshold: 0});
const lighthouse = require('lighthouse');

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

    it('Should visually match', async() => {
      for(const device of ['iPhone 6', 'iPad', 'iPad landscape', '']) {
        const target = differencify.init({ chain: false, testName: 'Home ' + device});
        await target.launch();
        const page = await target.newPage();

        if(device) {
          await page.emulate(puppeteer.devices[device]);
        } else {
          await page.setViewport({width: 1600, height: 1200});
        }
        
        await page.goto(config.baseURL);
        const image = await target.screenshot();
        const result = await target.toMatchSnapshot(image);
        await page.close();
        await target.close();

        expect(result).to.be.true;
      }
    });

    it('Should have a good performanced score', async() =>{
      const result = await lighthouse(config.baseURL, {
        port: (new URL(browser.wsEndpoint())).port,
        onlyCategories: ['performance']
      });

      expect(result.lhr.categories.performance.score >= 0.25).to.be.true;
    });

    it('Should have a good first contentful paint metric', async() =>{
      const result = await lighthouse(config.baseURL, {
        port: (new URL(browser.wsEndpoint())).port,
        onlyCategories: ['performance']
      });

      expect(result.lhr.audits['first-contentful-paint'].numericValue).lessThan(30000);
    });

    it('Should have properly sized images', async() =>{
      const result = await lighthouse(config.baseURL, {
        port: (new URL(browser.wsEndpoint())).port,
        onlyCategories: ['performance']
      });

      result.lhr.audits['uses-responsive-images'].numericValue.should.equal(0);
    });

    it('Should have a good first contentful paint metric using tracing', async() =>{
      await page.tracing.start({  screenshots: true, path: './homepagetracing.json' });
      await page.goto(config.baseURL);
      const trace = await page.tracing.stop();
      const result = JSON.parse(trace);
      const baseEvent = result.traceEvents.filter(i => i.name === 'TracingStartedInBrowser')[0].ts;
      const firstContentfulPaint = result.traceEvents.filter(i => i.name === 'firstContentfulPaint')[0].ts;
      expect((firstContentfulPaint - baseEvent) / 1000).lessThan(500);

      const traceScreenshots = result.traceEvents.filter(x => (
        x.cat === 'disabled-by-default-devtools.screenshot' &&
        x.name === 'Screenshot' &&
        x.args  &&
        x.args.snapshot
      ));

      traceScreenshots.forEach(function(snap) {
        fs.writeFileSync(`./hometrace-${snap.ts - baseEvent}.png`, snap.args.snapshot, 'base64', function(err){});
      });
    });

    it.only('It should have good coverage', async() =>{
      await Promise.all([page.coverage.startJSCoverage(), page.coverage.startCSSCoverage()]);
      await page.goto(config.baseURL);
      const [jsCoverage, cssCoverage] = await Promise.all([page.coverage.stopJSCoverage(), page.coverage.stopCSSCoverage()]);

      let totalBytes = 0;
      let usedBytes = 0;
      const coverageTotals = [
        ...jsCoverage,
        ...cssCoverage
      ];
      for(const entry of coverageTotals) {
        totalBytes += entry.text.length;
        for(const range of entry.ranges) usedBytes += range.end - range.start - 1;
      }
      const percentUnused = parseInt((usedBytes / totalBytes) * 100, 10);
      expect(percentUnused).greaterThan(90);
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
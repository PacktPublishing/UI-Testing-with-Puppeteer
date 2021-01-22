const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

(async() => {
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    const options = { logLevel : 'ínfo', output: 'html', onlyCategories: ['performance'], port: chrome.port };
    const runnerResult = await lighthouse('https://example.com', options);
    const reportHtml = runnerResult.report;
    fs.writeFileSync('lhreport.html', reportHtml);
    console.log('Report is done for' + runnerResult.lhr.finalUrl);
    console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);
    await chrome.kill();
})();
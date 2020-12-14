const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless : true, defaultViewport: null});
    const page = await browser.newPage();
    await page.goto('https://www.wikipedia.org/');
    await page.addStyleTag({
        content: `
        .search-input {
            display: none !important;
        }`
    });
    await page.pdf({
        path: './headers.pdf',
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: `
        <span style="font-size: 12px;">
            This is a custom PDF for 
            <span class="title"></span> (<span class="url"></span>)
        </span>
        `,
        footerTemplate: `
        <span style="font-size: 12px;">
            Generated on: <span class="date"></span><br/>
            Pages <span class="pageNumber"></span> of <span class="totalPages"></span>
        </span>`,
        margin: {
            top: '110px',
            bottom: '100px'
        }
    });
    await browser.close();
})();
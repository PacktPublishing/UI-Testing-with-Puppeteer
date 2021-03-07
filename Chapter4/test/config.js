module.exports = ({
    local: {
        baseURL : 'http://localhost:8080/',
        username: 'admin@gmail.com',
        password: 'admin',
        productToTestName: 'Macbook Pro 13.3\' Retina MF841LL/A',
        productToTestId: 1,
        launchOptions: { headless: false },
        timeout: 50000,
    },
    CI: {
        baseURL : 'http://localhost:8080/',
        username: 'admin@gmail.com',
        password: 'admin',
        productToTestName: 'Macbook Pro 13.3\' Retina MF841LL/A',
        launchOptions: { 
            executablePath: process.env.PUPPETEER_EXEC_PATH,
            headless: false,
            args: ['--no-sandbox'],
        },
        timeout: 50000,
    },
    prod: {}
})[process.env.TESTENV || 'local'];
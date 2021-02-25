module.exports = ({
    local: {
        baseURL : 'http://localhost:8080/',
        username: 'admin@gmail.com',
        password: 'admin',
        launchOptions: { headless: false },
        timeout: 5000,
    },
    CI: {
        baseURL : 'http://localhost:8080/',
        username: 'admin@gmail.com',
        password: 'admin',
        launchOptions: { 
            executablePath: process.env.PUPPETEER_EXEC_PATH,
            headless: true,
            args: ['--no-sandbox'],
        },
        timeout: 5000,
    },
    prod: {}
})[process.env.TESTENV || 'local'];
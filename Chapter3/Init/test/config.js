module.exports = ({
    local: {
        baseURL : 'http://localhost:8080/',
        timeout: 5000,
        username: 'admin@gmail.com',
        password: 'admin'
    },
    test: {},
    prod: {}
})[process.env.TESTENV || 'local'];
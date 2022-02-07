module.exports = ({
    local: {
        baseURL : 'https://www.packtpub.com/',
        brandName: 'Packt',
        mainProductName: 'Books'
    },
    test: {},
    prod: {}
})[process.env.TESTENV || 'local'];
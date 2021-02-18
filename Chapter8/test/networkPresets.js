module.exports = {
    GPRS: {
        download: 50 * 1024 / 8,
        upload: 20 * 1024 / 8,
        latency: 500,
    },
    Regular2G: {
        download: 250 * 1024 / 8,
        upload: 50 * 1024 / 8,
        latency: 300,
    },
    Good2G: {
        download: 450 * 1024 / 8,
        upload: 150 * 1024 / 8,
        latency: 150,
    },
    Regular3G: {
        download: 750 * 1024 / 8,
        upload: 250 * 1024 / 8,
        latency: 100,
    },
    Good3G: {
        download: 1.5 * 1024 * 1024 / 8,
        upload: 750 * 1024 / 8,
        latency: 40,
    },
    Regular4G: {
        download: 4 * 1024 * 1024 / 8,
        upload: 3 * 1024 * 1024 / 8,
        latency: 20,
    },
    DSL: {
        download: 2 * 1024 * 1024 / 8,
        upload: 1 * 1024 * 1024 / 8,
        latency: 5,
    },
    WiFi: {
        download: 30 * 1024 * 1024 / 8,
        upload: 15 * 1024 * 1024 / 8,
        latency: 2,
    },
};

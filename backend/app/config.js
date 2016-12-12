const config = {
    cors: {
        origin: (process.env.NODE_ENV === 'development') ? 'http://localhost:3000' : '',
        methods: 'POST,GET,PUT,OPTIONS,DELETE',
        allowedHeaders: 'Timezone-Offset,Origin,X-Requested-With,Content-Type,Accept,Authorization',
    },
    mongolab: {
        options: {
            server: {
                socketOptions: {
                    keepAlive: 1000,
                    connectTimeoutMS: 30000,
                    socketTimeoutMS: 30000,
                },
            },
            replset: {
                socketOptions: {
                    keepAlive: 1000,
                    connectTimeoutMS: 30000,
                    socketTimeoutMS: 30000,
                },
            },
        },
    },
    jwt: {
        tokenExpireIn: 24 * 60 * 60,
    },
    cacheFilesFor: '1d',
};

module.exports = config;

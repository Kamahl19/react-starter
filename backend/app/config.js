const frontendUrl = (process.env.NODE_ENV === 'development') ? 'http://localhost:3000' : 'http://domain.com';

const config = {
    cors: {
        origin: frontendUrl,
        methods: 'POST,GET,PUT,OPTIONS,DELETE',
        allowedHeaders: 'Timezone-Offset,Origin,X-Requested-With,Content-Type,Accept,Authorization',
    },
    mongolab: {
        url: 'mongodb://react-starter:p4ssw0rd@ds033976.mlab.com:33976/react-starter',
        options: {
            server: {
                socketOptions: {
                    keepAlive: 1,
                    connectTimeoutMS: 30000,
                },
            },
            replset: {
                socketOptions: {
                    keepAlive: 1,
                    connectTimeoutMS: 30000,
                },
            },
        },
    },
    jwt: {
        passwordSecret: 'secret',
        tokenExpireIn: 24 * 60 * 60, // 1 day
    },
    cacheFilesFor: '1d', // 1 day
    port: '3001',
};

module.exports = config;

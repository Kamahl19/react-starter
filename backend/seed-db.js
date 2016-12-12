// Load .env file with all the configuration
require('dotenv').config();

const seeder = require('mongoose-seed');
const User = require('./app/models/User');

const data = [{
    'model': 'User',
    'documents': [{
        email: 'admin@example.com',
        name: 'admin',
        password: User.generateHash('password'),
        isAdmin: true,
    }, {
        email: 'user@example.com',
        name: 'user',
        password: User.generateHash('password'),
    }]
}];

seeder.connect(process.env.MONGO_URL, () => {
    seeder.loadModels([
        'app/models/User.js',
    ]);

    seeder.clearModels(['User'], () => {
        seeder.populateModels(data, () => {
            console.log('DB seed was successful');
            process.exit(0);
        });
    });
});

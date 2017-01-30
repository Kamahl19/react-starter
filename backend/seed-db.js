// Load .env file with all the configuration
require('dotenv').config();

const seeder = require('mongoose-seed');
const User = require('./src/models/User');

const data = [{
    'model': 'User',
    'documents': [{
        email: 'admin@example.com',
        profile: {
            name: 'admin',
        },
        password: User.generateHash('password'),
        isAdmin: true,
    }, {
        email: 'user@example.com',
        profile: {
            name: 'user',
        },
        password: User.generateHash('password'),
    }]
}, {
    'model': 'Product',
    'documents': [{
        name: 'Product 1',
        description: 'Lorem ipsum',
    }, {
        name: 'Product 2',
        description: 'Some description',
    }]
}];

seeder.connect(process.env.MONGO_URL, () => {
    seeder.loadModels([
        'src/models/User.js',
        'src/models/Product.js',
    ]);

    seeder.clearModels(['User', 'Product'], () => {
        seeder.populateModels(data, () => {
            console.log('DB seed was successful');
            process.exit(0);
        });
    });
});

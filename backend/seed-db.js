// Load .env file with all the configuration
require('dotenv').config();

const seeder = require('mongoose-seed');
const User = require('./src/models/User');

const data = [
  {
    model: 'User',
    documents: [
      {
        email: 'user@example.com',
        password: User.generateHash('password'),
      },
    ],
  },
];

seeder.connect(process.env.MONGO_URL, () => {
  seeder.loadModels(['src/models/User.js']);

  seeder.clearModels(['User'], () => {
    seeder.populateModels(data, () => {
      console.log('DB seed was successful');
      process.exit(0);
    });
  });
});

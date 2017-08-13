// Load .env file with all the configuration
require('dotenv').config();

const seeder = require('mongoose-seed');

const data = [
  {
    model: 'User',
    documents: [
      {
        email: 'user@example.com',
        password: 'password',
        isActive: true,
      },
    ],
  },
];

seeder.connect(process.env.MONGO_URL, () => {
  seeder.loadModels(['src/features/user/userModel.js']);

  seeder.clearModels(['User'], () => {
    seeder.populateModels(data, () => {
      console.log('DB seed was successful');
      process.exit(0);
    });
  });
});

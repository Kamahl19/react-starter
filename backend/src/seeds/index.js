// Load .env file with all the configuration
require('dotenv').config();

const seeder = require('mongoose-seed');
const { hashPassword } = require('../features/user/authUtils');

seeder.connect(process.env.MONGO_URL, async () => {
  seeder.loadModels(['src/features/user/userModel.js']);

  const data = await getData();

  seeder.clearModels(['User'], () => {
    seeder.populateModels(data, () => {
      console.log('DB seed was successful');
      process.exit(0);
    });
  });
});

async function getData() {
  const password = await hashPassword('password');

  return [
    {
      model: 'User',
      documents: [
        {
          email: 'user@example.com',
          password,
          isActive: true,
        },
      ],
    },
  ];
}

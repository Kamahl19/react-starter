const User = require('./models/User');
const logger = require('./logger');

function createAdmin() {
    const email = 'test@test.com';
    const name = 'test';
    const password = 'password';

    User.findOne({ name }, (err, user) => {
        if (err) {
            logger.error(err);
        }
        else if (!user) {
            const newUser = new User({
                email,
                name,
                isAdmin: true,
                password: User.generateHash(password),
            });

            newUser.save((err2) => {
                if (err) {
                    logger.error(err2);
                }
                else {
                    logger.info('Admin created');
                }
            });
        }
    });
}

module.exports = {
    seed: () => {
        createAdmin();
    }
};

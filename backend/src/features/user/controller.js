'use strict';

const { wrap } = require('async-middleware');
const {
  getUserById,
  createUser,
  activateUser,
  login,
  forgottenPassword,
  resetPassword,
} = require('./service');

module.exports = {
  getById: wrap(async (req, res) => {
    const { userId } = req.params;

    const user = await getUserById(userId);

    return res.json({
      user: user.getPublicData(),
    });
  }),

  create: wrap(async (req, res) => {
    const { email, password } = req.body;

    const user = await createUser({ email, password }, req.headers.origin);

    return res.json({
      token: user.getAuthToken(),
      user: user.getPublicData(),
    });
  }),

  activate: wrap(async (req, res) => {
    const { userId, activationToken } = req.params;

    const user = await activateUser(userId, activationToken);

    return res.json({
      token: user.getAuthToken(),
      user: user.getPublicData(),
    });
  }),

  login: wrap(async (req, res) => {
    const { email, password } = req.body;

    const user = await login(email, password);

    return res.json({
      token: user.getAuthToken(),
      user: user.getPublicData(),
    });
  }),

  forgottenPassword: wrap(async (req, res) => {
    const { email } = req.body;

    await forgottenPassword(email, req.headers.origin);

    return res.end();
  }),

  resetPassword: wrap(async (req, res) => {
    const { email, passwordResetToken, password } = req.body;

    const user = await resetPassword(email, passwordResetToken, password);

    return res.json({
      token: user.getAuthToken(),
      user: user.getPublicData(),
    });
  }),
};

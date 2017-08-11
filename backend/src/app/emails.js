const forgottenPasswordMail = link => ({
  subject: 'Reset your password',
  text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n
Please click on the following link, or paste this into your browser to complete the process:\n
${link}\n
If you did not request this, please ignore this email and your password will remain unchanged.\n`,
});

const resetPasswordMail = email => ({
  subject: 'Your password has been changed',
  text: `Hello,\n\nThis is a confirmation that the password for your account ${email} has just been changed.\n`,
});

const activationMail = link => ({
  subject: 'Activate your account',
  text: `Please click on the following link, or paste this into your browser to activate your account:\n
${link}\n`,
});

module.exports = {
  forgottenPasswordMail,
  resetPasswordMail,
  activationMail,
};

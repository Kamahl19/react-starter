'use strict';

const {
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
  BadRequestError,
} = require('../../common/utils/apiErrors');

module.exports = {
  PageNotFoundError: () => new NotFoundError({ message: 'Page not found' }),

  UserNotFoundError: () => new NotFoundError({ message: 'Requested user does not exist.' }),

  ActivationTokenInvalidError: () =>
    ForbiddenError({
      message: 'Activation token is invalid or has expired.',
    }),

  PasswordResetTokenInvalidError: () =>
    ForbiddenError({
      message: 'Password reset token is invalid or has expired.',
    }),

  LoginCredentialsError: () => new UnauthorizedError({ message: 'Login credentials are wrong.' }),

  NotAllowedAccessError: () =>
    UnauthorizedError({ message: 'You are not allowed to access this page.' }),

  AuthTokenNotFoundError: () =>
    new UnauthorizedError({ message: 'No authorization token was found.' }),

  AuthTokenInvalidError: () =>
    UnauthorizedError({
      message: 'Format of the Authorization header is invalid.',
    }),

  RequestNotValidError: err => new BadRequestError({ message: formatErrorMessage(err) }),
};

/**
 * Format error message
 */
const splitCamelCase = camelCase => camelCase.replace(/([A-Z][a-z])/g, ' $1');
const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);
const formatErrorMessage = errors =>
  errors.map(({ message }) => {
    const msgArr = message.split('"');

    if (!msgArr[1].includes(' ')) {
      msgArr[1] = capitalize(splitCamelCase(msgArr[1]));
    }

    return msgArr.join('"');
  });

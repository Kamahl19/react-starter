import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

const UserProfile = ({ user, t }) =>
  <div>
    <h1>{t('User Profile')}</h1>
    <p>{t('Username')}: {user.email}</p>
    <p>{t('Is Active')}: {user.isActive ? t('Yes') : t('No')}</p>
  </div>;

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate()(UserProfile);

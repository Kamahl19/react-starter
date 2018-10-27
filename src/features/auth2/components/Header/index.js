import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import { translate, Trans } from 'react-i18next';

import config from '../../../../config';
import { Header, Menu, ButtonLink, LanguageDropdown } from '../../../../common/components';

const { Item: MenuItem } = Menu;

const { baseURL } = config();

const AuthHeader = ({ i18n }) => (
  <Header>
    {({ isMobile }) => [
      <MenuItem key="news">
        <a href={`${baseURL}/${i18n.language}/news/`}>
          <Trans i18nKey="nav.news">News</Trans>
        </a>
      </MenuItem>,
      <MenuItem key="team">
        <a href={`${baseURL}/${i18n.language}/team/`}>
          <Trans i18nKey="nav.team">Team</Trans>
        </a>
      </MenuItem>,
      <MenuItem key="whitepaper">
        <a href={`${baseURL}/assets/whitepaper-${i18n.language}.pdf`}>
          <Trans i18nKey="nav.docs.whitepaper">Whitepaper</Trans>
        </a>
      </MenuItem>,
      <MenuItem key="signup" className="btn-item btn-item-auth">
        <ButtonLink className="btn-auth signup" to="/auth/sign-up">
          <Trans i18nKey="nav.signup">Sign Up</Trans>
        </ButtonLink>
      </MenuItem>,
      <MenuItem key="login" className="btn-item btn-item-auth">
        <ButtonLink className="btn-auth login" to="/auth/login">
          <Trans i18nKey="nav.login">Log In</Trans>
        </ButtonLink>
      </MenuItem>,
      <MenuItem className="btn-item" key="language">
        <LanguageDropdown
          wrapperClassName={isMobile ? 'is-mobile' : ''}
          value={i18n.language}
          onChange={lang => i18next.changeLanguage(lang.toLowerCase())}
        />
      </MenuItem>,
    ]}
  </Header>
);

AuthHeader.propTypes = {
  i18n: PropTypes.object.isRequired,
};

export default translate()(AuthHeader);

import React from 'react';
import { Trans } from 'react-i18next';
import cn from 'classnames';

import { Spin } from '../../../../common/components';

const AuthSpinner = ({ className }) => (
  <div className={cn('auth-spinner', className)}>
    <Spin />
    <h1>
      <Trans i18nKey="auth.pleaseWait">Please wait...</Trans>
    </h1>
  </div>
);

export default AuthSpinner;

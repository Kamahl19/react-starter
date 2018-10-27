import React from 'react';
import { Trans } from 'react-i18next';

import Layout from '../Layout';

const Footer = () => (
  <Layout.Footer>
    <Trans i18nKey="footer.copyright">Copyright</Trans>
  </Layout.Footer>
);

export default Footer;

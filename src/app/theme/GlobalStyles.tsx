import { Global, css } from '@emotion/react';

import 'antd/dist/reset.css';

const GlobalStyles = () => <Global styles={styles} />;

export default GlobalStyles;

const styles = css({
  '#root': {
    height: '100%',
  },
});

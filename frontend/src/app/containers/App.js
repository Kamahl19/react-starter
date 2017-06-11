import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from 'antd/lib/layout';
import HeaderContainer from './HeaderContainer';
import { Content, Footer } from '@src/app/components';
import { selectShowSpinner } from '@src/features/spinner/ducks';

const mapStateToProps = state => ({
  showSpinner: selectShowSpinner(state),
});

const AppContainer = ({ children, showSpinner }) =>
  <Layout>
    <HeaderContainer />
    <Content showSpinner={showSpinner}>
      {children}
    </Content>
    <Footer />
  </Layout>;

AppContainer.propTypes = {
  children: PropTypes.node.isRequired,
  showSpinner: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(AppContainer);

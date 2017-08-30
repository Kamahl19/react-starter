import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from 'antd/lib/layout';
import HeaderContainer from './HeaderContainer';
import { Content, Footer } from '../../app/components';
import { selectShowSpinner } from '../../features/spinner/ducks';

const mapStateToProps = state => ({
  showSpinner: selectShowSpinner(state),
});

const AppContainer = ({ children, showSpinner }) => (
  <Layout>
    <HeaderContainer />
    <Content showSpinner={showSpinner}>{children}</Content>
    <Footer />
  </Layout>
);

AppContainer.propTypes = {
  children: PropTypes.node.isRequired,
  showSpinner: PropTypes.bool.isRequired,
};

export default withRouter(connect(mapStateToProps)(AppContainer));

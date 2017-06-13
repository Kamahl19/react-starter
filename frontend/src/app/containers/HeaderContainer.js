import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header } from '@src/app/components';
import { ResponsiveMenu } from '@src/common/components/hoc';
import { selectIsLoggedIn, selectEmail, logout } from '@src/features/auth/ducks';

const mapStateToProps = state => ({
  isLoggedIn: selectIsLoggedIn(state),
  email: selectEmail(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ logout }, dispatch),
});

@withRouter
@ResponsiveMenu()
@connect(mapStateToProps, mapDispatchToProps)
export default class HeaderContainer extends Component {
  static propTypes = {
    menuMode: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    email: PropTypes.string,
    history: PropTypes.object.isRequired,
  };

  state = {
    responsiveMenuVisible: false,
  };

  componentDidMount() {
    this.unlisten = this.props.history.listen(this.hideResponsiveMenu);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  showResponsiveMenu = () => {
    this.setState({ responsiveMenuVisible: true });
  };

  hideResponsiveMenu = () => {
    this.setState({ responsiveMenuVisible: false });
  };

  toggleResponsiveMenu = responsiveMenuVisible => {
    this.setState({ responsiveMenuVisible });
  };

  render() {
    const { actions, isLoggedIn, menuMode, email } = this.props;
    const { responsiveMenuVisible } = this.state;

    return (
      <Header
        isLoggedIn={isLoggedIn}
        email={email}
        logout={actions.logout}
        responsiveMenuVisible={responsiveMenuVisible}
        menuMode={menuMode}
        showResponsiveMenu={this.showResponsiveMenu}
        hideResponsiveMenu={this.hideResponsiveMenu}
        toggleResponsiveMenu={this.toggleResponsiveMenu}
      />
    );
  }
}

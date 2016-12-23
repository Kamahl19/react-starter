import React, { Component, PropTypes } from 'react';
import Alert from 'react-s-alert';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Header, ScreenContent, Footer } from '@src/components/app';
import { Loader } from '@src/modules/loader/components';
import { getIsLoggedIn, getUserName, loginWithToken, logout } from '@src/modules/auth/ducks/authDucks';
import { getShowLoader } from '@src/modules/loader/ducks/loader';

const mapStateToProps = (state) => ({
    showLoader: getShowLoader(state),
    isLoggedIn: getIsLoggedIn(state),
    userName: getUserName(state),
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ loginWithToken, logout }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class AppContainer extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        actions: PropTypes.object.isRequired,
        showLoader: PropTypes.bool.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        userName: PropTypes.string,
    };

    componentWillMount() {
        this.props.actions.loginWithToken();
    }

    render() {
        const { actions, children, showLoader, isLoggedIn, userName } = this.props;

        return (
            <div className="screen-wrapper">

                <Header
                    isLoggedIn={isLoggedIn}
                    userName={userName}
                    logout={actions.logout}
                />

                <ScreenContent>
                    {children}
                </ScreenContent>

                <Footer />

                <Loader show={showLoader} />

                <Alert
                    position="top-right"
                    timeout={3000}
                    stack={{ spacing: 10 }}
                />

            </div>
        );
    }
}

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import Alert from 'react-s-alert';
import { Footer } from '@components/layout';
import { HeaderContainer, LoaderContainer } from '@containers/layout';
import { loginUserSuccess, fetchUser } from '@actions/user';
import { isTokenValid } from '@utils/authHelpers';

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn,
    user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ fetchUser, loginUserSuccess }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        user: PropTypes.object,
        actions: PropTypes.object.isRequired,
    };

    componentWillMount() {
        const token = localStorage.getItem(window.tokenName);

        if (isTokenValid(token)) {
            const { userId } = jwtDecode(token);

            this.props.actions.fetchUser(userId);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { user, isLoggedIn, actions } = nextProps;

        if (user && !isLoggedIn) {
            actions.loginUserSuccess(user);
        }
    }

    render() {
        const { children } = this.props;

        return (
            <div>

                <HeaderContainer />

                {children}

                <Footer />

                <LoaderContainer />

                <Alert
                    position="top-right"
                    timeout={3000}
                    stack={{ spacing: 10 }}
                />

            </div>
        );
    }
}

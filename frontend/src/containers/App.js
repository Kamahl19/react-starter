import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import jwtDecode from 'jwt-decode';
import Alert from 'react-s-alert';
import { Footer } from '@components/layout';
import { HeaderContainer, LoaderContainer } from '@containers/layout';
import { loginUserSuccess, fetchUser } from '@actions/auth';
import { isTokenValid } from '@utils/authHelpers';

const mapStateToProps = (state, ownProps) => ({
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
    queryNext: ownProps.location.query.next,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ fetchUser, loginUserSuccess }, dispatch),
    redirectAfterLogin: (queryNext) => dispatch(push(queryNext || '/'))
});

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        user: PropTypes.object,
        queryNext: PropTypes.string,
        actions: PropTypes.object.isRequired,
        redirectAfterLogin: PropTypes.func.isRequired,
    };

    componentWillMount() {
        const token = localStorage.getItem(window.tokenName);

        if (isTokenValid(token)) {
            const { userId } = jwtDecode(token);

            this.props.actions.fetchUser(userId);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { user, isLoggedIn, queryNext, actions, redirectAfterLogin } = nextProps;

        if (user && !isLoggedIn) {
            const token = localStorage.getItem(window.tokenName);

            actions.loginUserSuccess({ token, user });

            redirectAfterLogin(queryNext);
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

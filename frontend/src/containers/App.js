import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
});

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        user: PropTypes.object,
        queryNext: PropTypes.string,
        actions: PropTypes.object.isRequired,
    };

    // TODO
    componentWillMount() {
        const token = localStorage.getItem(window.tokenName);

        if (isTokenValid(token)) {
            const { userId } = jwtDecode(token);

            this.props.actions.fetchUser(userId);
        }
    }

    // TODO
    componentWillReceiveProps(nextProps) {
        const { user, isLoggedIn, queryNext, actions } = nextProps;

        if (user && !isLoggedIn) {
            actions.loginUserSuccess(user, queryNext);
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

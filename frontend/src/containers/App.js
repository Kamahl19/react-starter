import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import Alert from 'react-s-alert';
import { Footer } from '@components/layout';
import { HeaderContainer, LoaderContainer } from '@containers/layout';
import { loginUserWithToken, fetchUser } from '@actions/user';
import { isTokenValid } from '@utils/authHelpers';

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ fetchUser, loginUserWithToken }, dispatch),
});

@connect(undefined, mapDispatchToProps)
export default class App extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        actions: PropTypes.object.isRequired,
    };

    componentWillMount() {
        const { actions } = this.props;

        const token = localStorage.getItem(window.tokenName);

        if (isTokenValid(token)) {
            const { userId } = jwtDecode(token);

            actions.fetchUser(userId).then(({ payload }) => {
                const { user } = payload;

                actions.loginUserWithToken(user, token);
            });
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

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Alert from 'react-s-alert';
import { HeaderContainer, ScreenContentContainer, FooterContainer, LoaderContainer } from '@src/containers/layout';
import { loginWithToken } from '@src/ducks/auth';

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ loginWithToken }, dispatch),
});

@connect(undefined, mapDispatchToProps)
export default class App extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        actions: PropTypes.object.isRequired,
    };

    componentWillMount() {
        this.props.actions.loginWithToken();
    }

    render() {
        const { children } = this.props;

        return (
            <div id="screen-wrapper">

                <HeaderContainer />

                <ScreenContentContainer>
                    {children}
                </ScreenContentContainer>

                <FooterContainer />

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

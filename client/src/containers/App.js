import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Alert from 'react-s-alert';
import { Footer } from '@src/components/layout';
import { HeaderContainer, LoaderContainer } from '@src/containers/layout';
import { loginWithToken } from '@src/actions/auth';

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

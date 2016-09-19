import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ScreenContent } from '@components/layout';

// TODO - move to containers

const mapStateToProps = (state) => ({
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn,
});

@connect(mapStateToProps)
export default class IndexPage extends Component {
    static propTypes = {
        user: PropTypes.object,
        isLoggedIn: PropTypes.bool.isRequired,
    };

    render() {
        const { user, isLoggedIn } = this.props;

        return (
            <ScreenContent>

                {!isLoggedIn &&
                    <h1>Hello visitor</h1>
                }

                {user &&
                    <h1>Hello {user.name}</h1>
                }

            </ScreenContent>
        );
    }
}

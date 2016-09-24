import React, { Component, PropTypes } from 'react';
import { ScreenContent } from '@components/layout';

export default class Home extends Component {
    static propTypes = {
        userName: PropTypes.string.isRequired,
    };

    render() {
        const { userName } = this.props;

        return (
            <ScreenContent>

                <h1>Hello {userName}</h1>

            </ScreenContent>
        );
    }
}

import React, { Component } from 'react';

export default (stateNames) => (ComposedComponent) => class extends Component {
    state = stateNames.reduce((o, stateName) => ({
        ...o,
        [stateName]: '',
    }), {});

    linkState = (stateName) => ({
        value: this.state[stateName],
        onChange: (e) => this.setState({ [stateName]: e.target.value }),
    });

    render() {
        return (
            <ComposedComponent
                {...this.props}
                {...this.state}
                linkState={this.linkState}
            />
        );
    }
};

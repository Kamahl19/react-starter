import React, { Component } from 'react';

const getIntersection = (arr1, arr2) => arr1.filter((x) => arr2.includes(x));

export default (stateNames) => (ComposedComponent) => class extends Component {
    constructor(props) {
        super(props);

        const intersection = getIntersection(Object.keys(props), stateNames);

        if (intersection.length) {
            console.warn(`LinkedState: ${intersection} props are interfering with stateNames!`);
        }

        this.state = stateNames.reduce((o, stateName) => ({
            ...o,
            [stateName]: '',
        }), {});
    }

    linkState = (stateName) => ({
        value: this.state[stateName],
        onChange: (e) => this.setState({ [stateName]: e.target ? e.target.value : e }),
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

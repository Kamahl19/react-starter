import React, { Component } from 'react';

const getIntersection = (arr1, arr2) => arr1.filter((x) => arr2.includes(x));

export default (stateNames) => (ComposedComponent) => class LinkedState extends Component {
    constructor(props) {
        super(props);

        if (process.env.NODE_ENV === 'development') {
            const intersection = getIntersection(Object.keys(props), stateNames);

            if (intersection.length) {
                console.warn(`LinkedState: ${intersection} props are interfering with stateNames!`);
            }
        }

        this.state = stateNames.reduce((o, stateName) => ({
            ...o,
            [stateName]: '',
        }), {});
    }

    changeValue = (stateName, value) => {
        this.setState({ [stateName]: value });
    }

    linkState = (stateName) => ({
        value: this.state[stateName],
        onChange: (e) => this.changeValue(stateName, e.target ? e.target.value : e),
    });

    render() {
        return (
            <ComposedComponent
                {...this.props}
                {...this.state}
                linkSetState={(o) => this.setState(o)}
                linkState={this.linkState}
            />
        );
    }
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Store extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    initialState: PropTypes.object,
  };

  state = {
    ...this.props.initialState,
  };

  handleSetState = value => this.setState({ ...value });

  render() {
    const { children } = this.props;

    return children({
      ...this.state,
      setState: this.handleSetState,
    });
  }
}

const StoreDecorator = initialState => storyFn => (
  <Store initialState={initialState}>{storyFn()}</Store>
);

Store.Decorator = StoreDecorator;

export default Store;

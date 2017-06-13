import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { activateUserRequest } from '../ducks';

const mapStateToProps = (state, props) => ({
  userId: props.match.params.userId,
  activationToken: props.match.params.activationToken,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      activateUser: activateUserRequest,
    },
    dispatch
  ),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class UserActivationContainer extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
    activationToken: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { actions, userId, activationToken } = this.props;
    actions.activateUser({ userId, activationToken });
  }

  render() {
    return <div />;
  }
}

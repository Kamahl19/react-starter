import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../ducks/authDucks';
import { UserProfile } from '../components';

const mapStateToProps = (state) => ({
    user: getUser(state),
});

@connect(mapStateToProps)
export default class UserProfileContainer extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
    };

    render() {
        const { user } = this.props;

        if (!user) {
            return (<div />);
        }

        return (
            <UserProfile user={user} />
        );
    }
}

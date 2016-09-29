import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { UserProfile } from '@components/screens';

const mapStateToProps = (state) => ({
    user: state.user.user,
});

@connect(mapStateToProps)
export default class UserProfileContainer extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
    };

    render() {
        const { user } = this.props;

        return (
            <UserProfile user={user} />
        );
    }
}

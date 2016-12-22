import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUser } from '@src/ducks/auth';
import { UserProfile } from '@src/components/screens';

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

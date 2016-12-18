import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { getSelectedUser, fetchUser } from '@src/ducks/users';
import { getUserId } from '@src/ducks/auth';
import { UserProfile } from '@src/components/screens';

const getUserIdFromUrl = (_, props) => props.params && props.params.userId;

const makeGetUserIdFromUrlOrAuth = () =>
    createSelector(
        getUserId,
        getUserIdFromUrl,
        (userId, paramUserId) => paramUserId || userId || '',
    );

const mapStateToProps = () => {
    const getUserIdFromUrlOrAuth = makeGetUserIdFromUrlOrAuth();

    return (state, props) => ({
        selectedUser: getSelectedUser(state),
        userId: getUserIdFromUrlOrAuth(state, props),
    });
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ fetchUser }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class UserProfileContainer extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        selectedUser: PropTypes.object,
        userId: PropTypes.string.isRequired,
    };

    componentWillMount() {
        const { actions, userId } = this.props;

        actions.fetchUser(userId);
    }

    render() {
        const { selectedUser } = this.props;

        if (!selectedUser) {
            return (<div />);
        }

        return (
            <UserProfile user={selectedUser} />
        );
    }
}

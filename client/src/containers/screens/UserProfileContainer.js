import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { getUser } from '@src/reducers/user';
import { getUserId } from '@src/reducers/auth';
import { fetchUser } from '@src/actions/user';
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
        user: getUser(state),
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
        user: PropTypes.object,
        userId: PropTypes.string.isRequired,
    };

    componentWillMount() {
        const { actions, userId } = this.props;

        actions.fetchUser(userId);
    }

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

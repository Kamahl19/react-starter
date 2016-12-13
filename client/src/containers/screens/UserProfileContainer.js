import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '@src/actions/user';
import { UserProfile } from '@src/components/screens';

const mapStateToProps = ({ user, auth }, { params }) => ({
    user: user.user,
    userId: params.userId || auth.user.id,
});

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

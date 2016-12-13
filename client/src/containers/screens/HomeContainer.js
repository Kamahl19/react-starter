import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsers, deleteUser } from '@src/actions/user';
import { Home } from '@src/components/screens';

const mapStateToProps = ({ auth, user }) => ({
    users: user.users,
    canDelete: auth.isLoggedIn && auth.user.isAdmin,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        fetchUsers,
        deleteUser,
    }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class HomeContainer extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        users: PropTypes.array.isRequired,
        canDelete: PropTypes.bool.isRequired,
    };

    componentWillMount() {
        this.props.actions.fetchUsers();
    }

    onDeleteClick = (userId) => {
        this.props.actions.deleteUser(userId);
    }

    render() {
        const { users, canDelete } = this.props;

        return (
            <Home
                users={users}
                canDelete={canDelete}
                onDeleteClick={this.onDeleteClick}
            />
        );
    }
}

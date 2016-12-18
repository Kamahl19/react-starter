import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserIsAdmin } from '@src/ducks/auth';
import { getUsers, fetchUsers, deleteUser } from '@src/ducks/users';
import { UserTable } from '@src/components/screens';

const mapStateToProps = (state) => ({
    users: getUsers(state),
    canDelete: getUserIsAdmin(state),
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        fetchUsers,
        deleteUser,
    }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class UserTableContainer extends Component {
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
            <UserTable
                users={users}
                canDelete={canDelete}
                onDeleteClick={this.onDeleteClick}
            />
        );
    }
}

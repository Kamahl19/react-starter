import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { Table } from '@src/components/ui';
import { ScreenContent } from '@src/components/layout';

const UserTableRow = ({ user, idx, canDelete, onDeleteClick }) => (
    <tr>
        <td>{idx + 1}</td>
        <td>
            <Link to={`users/${user.id}`}>{user.name}</Link>
        </td>
        <td>{user.email}</td>
        <td className="text-center">
            {user.isAdmin && <FontAwesome name="check" />}
        </td>
        {canDelete &&
            <td className="text-center">
                <Button bsStyle="danger" bsSize="xsmall" onClick={() => onDeleteClick(user.id)}>
                    <FontAwesome name="trash" />
                </Button>
            </td>
        }
    </tr>
);

UserTableRow.propTypes = {
    user: PropTypes.object.isRequired,
    idx: PropTypes.number.isRequired,
    canDelete: PropTypes.bool.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
};

const UserTable = ({ users, canDelete, onDeleteClick }) => (
    <ScreenContent>

        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>E-mail</th>
                    <th className="text-center">Admin</th>
                    {canDelete &&
                        <th></th>
                    }
                </tr>
            </thead>
            <tbody>
                {users.map((user, idx) => (
                    <UserTableRow
                        key={user.id}
                        user={user}
                        idx={idx}
                        canDelete={canDelete}
                        onDeleteClick={onDeleteClick}
                    />
                ))}
                {!users.length &&
                    <tr>
                        <td colSpan={10}>No data</td>
                    </tr>
                }
            </tbody>
        </Table>

    </ScreenContent>
);

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    canDelete: PropTypes.bool.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
};

export default UserTable;

import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { Table } from '@src/components/ui';
import { ScreenContent } from '@src/components/layout';

export default class Home extends Component {
    static propTypes = {
        users: PropTypes.array.isRequired,
        canDelete: PropTypes.bool.isRequired,
        onDeleteClick: PropTypes.func.isRequired,
    };

    render() {
        const { users, canDelete, onDeleteClick } = this.props;

        return (
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
                        {users.map((u, idx) => (
                            <tr key={u.id}>
                                <td>{idx + 1}</td>
                                <td>
                                    <Link to={`users/${u.id}`}>{u.name}</Link>
                                </td>
                                <td>{u.email}</td>
                                <td className="text-center">
                                    {u.isAdmin && <FontAwesome name="check" />}
                                </td>
                                {canDelete &&
                                    <td className="text-center">
                                        <Button bsStyle="danger" bsSize="xsmall" onClick={() => onDeleteClick(u.id)}>
                                            <FontAwesome name="trash" />
                                        </Button>
                                    </td>
                                }
                            </tr>
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
    }
}

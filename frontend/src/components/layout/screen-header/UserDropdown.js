import React, { Component, PropTypes } from 'react';
import { Nav, NavDropdown, MenuItem } from 'react-bootstrap';

export default class UserDropdown extends Component {
    static propTypes = {
        onLogoutClicked: PropTypes.func.isRequired,
        user: PropTypes.object,
    };

    onLogoutClick = (e) => {
        e.preventDefault();

        this.props.onLogoutClicked();
    }

    render() {
        const { user } = this.props;

        const title = (<span>Hi {user.name}</span>);

        return (
            <Nav pullRight>
                <NavDropdown title={title} id="user-dropdown">
                    <MenuItem onClick={this.onLogoutClick}>Log Out</MenuItem>
                </NavDropdown>
            </Nav>
        );
    }
}

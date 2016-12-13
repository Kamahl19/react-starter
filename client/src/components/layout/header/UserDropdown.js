import React, { Component, PropTypes } from 'react';
import { Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class UserDropdown extends Component {
    static propTypes = {
        userName: PropTypes.string.isRequired,
        logout: PropTypes.func.isRequired,
    };

    handleLogout = () => {
        this.props.logout();
    }

    render() {
        const { userName } = this.props;

        const title = (<span>Hi {userName}</span>);

        return (
            <Nav pullRight>
                <NavDropdown title={title} id="user-dropdown">
                    <LinkContainer to="/me">
                        <MenuItem>Profile</MenuItem>
                    </LinkContainer>
                    <MenuItem divider/>
                    <MenuItem onClick={this.handleLogout}>Log Out</MenuItem>
                </NavDropdown>
            </Nav>
        );
    }
}

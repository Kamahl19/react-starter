import React, { PropTypes } from 'react';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const UserMenu = ({ userName, logout }) => (
    <Navbar.Collapse>
        <Nav pullRight>
            <NavDropdown title={(<span>Hi {userName}</span>)} id="user-dropdown">
                <LinkContainer to="/me">
                    <MenuItem>{userName}</MenuItem>
                </LinkContainer>
                <LinkContainer to="/me/update">
                    <MenuItem>Update Profile</MenuItem>
                </LinkContainer>
                <MenuItem divider />
                <MenuItem onClick={logout}>Log Out</MenuItem>
            </NavDropdown>
        </Nav>
    </Navbar.Collapse>
);

UserMenu.propTypes = {
    userName: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
};

export default UserMenu;

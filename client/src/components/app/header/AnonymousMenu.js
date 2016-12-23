import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default () => (
    <Navbar.Collapse>
        <Nav pullRight>
            <LinkContainer to="/sign-up">
                <NavItem>Sign Up</NavItem>
            </LinkContainer>
            <LinkContainer to="/login">
                <NavItem>Log In</NavItem>
            </LinkContainer>
        </Nav>
    </Navbar.Collapse>
);

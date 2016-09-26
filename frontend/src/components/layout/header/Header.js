import React, { Component, PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import UserDropdown from './UserDropdown';

export default class Header extends Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        userName: PropTypes.string.isRequired,
        logout: PropTypes.func.isRequired,
    };

    renderVisitorMenu() {
        return (
            <Navbar.Collapse>

                <Nav pullRight>
                    <LinkContainer to="/login">
                        <NavItem>Log In</NavItem>
                    </LinkContainer>
                </Nav>

            </Navbar.Collapse>
        );
    }

    renderIsLoggedInMenu() {
        const { userName, logout } = this.props;

        return (
            <Navbar.Collapse>

                <UserDropdown
                    userName={userName}
                    logout={logout}
                />

            </Navbar.Collapse>
        );
    }

    render() {
        const { isLoggedIn } = this.props;

        return (
            <div className="screen-header">

                <Navbar fixedTop>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">React Starter</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>

                    {!isLoggedIn &&
                        this.renderVisitorMenu()
                    }

                    {isLoggedIn &&
                        this.renderIsLoggedInMenu()
                    }
                </Navbar>

            </div>
        );
    }
}

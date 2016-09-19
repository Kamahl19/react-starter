import React, { Component, PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logoutAndRedirect } from '@actions/auth';
import { LinkContainer } from 'react-router-bootstrap';
import UserDropdown from './UserDropdown';

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logoutAndRedirect())
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ScreenHeader extends Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        user: PropTypes.object,
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
        const { user, logout } = this.props;

        return (
            <Navbar.Collapse>
                <UserDropdown
                    user={user}
                    onLogoutClicked={logout}
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

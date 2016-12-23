import React, { PropTypes } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import AnonymousMenu from './AnonymousMenu';
import UserMenu from './UserMenu';

const Header = ({ isLoggedIn, userName, logout }) => (
    <div id="screen-header">
        <Navbar fixedTop>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/">React Starter</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            {!isLoggedIn &&
                <AnonymousMenu />
            }
            {isLoggedIn &&
                <UserMenu
                    userName={userName}
                    logout={logout}
                />
            }
        </Navbar>
    </div>
);

Header.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    userName: PropTypes.string,
    logout: PropTypes.func.isRequired,
};

export default Header;

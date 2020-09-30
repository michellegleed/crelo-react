import React, { useEffect, useState, Fragment } from 'react';
import { Link, useLocation } from "react-router-dom";

import './Nav.css';

function Nav() {

    /// Show/Hide Drop-Down Account Menu
    const [showAccountMenu, setShowAccountMenu] = useState(false);

    const toggleAccountMenu = () => {
        setShowAccountMenu(!showAccountMenu);
    }

    const displayStyle = {
        display: showAccountMenu ? "flex" : "none"
    }

    /// Update Nav Based on Logged In/Out
    const [loggedIn, setLoggedIn] = useState(false);

    // location variable will update whenever the react app's url changes
    const location = useLocation();

    // runs @ first render and whenever location changes.
    useEffect(() => {
        const token = window.localStorage.getItem("token");
        token != null ? setLoggedIn(true) : setLoggedIn(false);
    }, [location]);

    const handleLogout = () => {
        window.localStorage.clear();
    };

    return (
        <nav>
            <div id="nav-container">
                {loggedIn ?
                    <React.Fragment>
                    <Link to="/">Home</Link>
                    <Link to="/categories">Browse Categories</Link>
                    <div id="nav-account-div">
                        <button id="nav-account-btn" onClick={toggleAccountMenu}>My Account</button>
                        <div id="nav-account-menu" style={displayStyle}>
                            <Link to="/account">My Profile</Link>
                            <Link to="/new-project">New Project</Link>
                            <Link to="/user-projects">My Projects</Link>
                            <Link to="/login" onClick={handleLogout}>Log Out</Link>
                        </div>
                        </div>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Link to="/about">About</Link>
                        <Link to="/login">Log In</Link>
                        <Link to="/signup">Sign Up</Link>
                    </React.Fragment>
                }
            </div>
        </nav>
    )
}

export default Nav;
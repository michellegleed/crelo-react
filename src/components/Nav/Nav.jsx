import React, { useEffect, useState, useContext, Fragment } from 'react';
import { Link, useLocation } from "react-router-dom";
// import { loggedInUser } from '../../data';
import { UserDetailsContext } from '../../utils/context';

import './Nav.css';

function Nav() {

    /// Update Nav Based on Logged In/Out
    const [loggedIn, setLoggedIn] = useState(false);

    // location variable will update whenever the react app's url changes
    const location = useLocation();

    // runs @ first render and whenever url location changes
    useEffect(() => {
        const token = window.localStorage.getItem("token");
        token != null ? setLoggedIn(true) : setLoggedIn(false);
    }, [location]);

    /// Check context for userDetails and if none, fetch userDetails and save to the context
    const { userDetails, actions } = useContext(UserDetailsContext);

    useEffect(() => {
        if (loggedIn) {
            if (!userDetails.user) {
                console.log("logged in but no user details saved! fetching user details now.");
                const token = window.localStorage.getItem("token");
                console.log(token);
                if (token) {
                    fetch(`${process.env.REACT_APP_API_URL}account/`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `token ${token}`
                        },
                    })
                        .then((results) => {
                            return results.json()
                        })
                        .then((data) => {
                            actions.updateAllDetails(data);
                        });
                }
            }
        }
    }, [loggedIn])


    /// Logout
    const handleLogout = () => {
        window.localStorage.clear();
        actions.clearDetails();
    };


    /// Show/Hide Drop-Down Account Menu
    const [displayAccountMenu, setDisplayAccountMenu] = useState(false);

    const showAccountMenu = () => {
        setDisplayAccountMenu(true);
        document.addEventListener('click', hideAccountMenu);
    }

    const hideAccountMenu = () => {
        setDisplayAccountMenu(false);
        document.removeEventListener('click', hideAccountMenu);
    }

    const displayStyle = {
        display: displayAccountMenu ? "flex" : "none"
    }


    return (
        <nav>
            <div id="nav-container">
                {loggedIn ?
                    <Fragment>
                        <Link to="/">Home</Link>
                        <Link to="/categories">Browse Categories</Link>
                        <div id="nav-account-div">
                            <button id="nav-account-btn" onClick={showAccountMenu}>My Account</button>
                            <div id="nav-account-menu" style={displayStyle}>
                                <Link to="/account">My Profile</Link>
                                <Link to="/new-project">New Project</Link>
                                <Link to="/user-projects">My Projects</Link>
                                <Link to="/login" onClick={handleLogout}>Log Out</Link>
                            </div>
                        </div>
                    </Fragment>
                    :
                    <Fragment>
                        <Link to="/about">About</Link>
                        <Link to="/login">Log In</Link>
                        <Link to="/signup">Sign Up</Link>
                    </Fragment>
                }
            </div>
        </nav>
    )
}

export default Nav;
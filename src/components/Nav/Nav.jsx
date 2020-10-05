import React, { useEffect, useState, useContext, Fragment } from 'react';
import { Link, useLocation } from "react-router-dom";
// import { loggedInUser } from '../../data';
import { UserDetailsContext } from '../../utils/context';
import MobileNav from './MobileNav/MobileNav';
import DesktopNav from './DesktopNav/DesktopNav';

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
        <Fragment>
            <MobileNav loggedIn={loggedIn} handleLogout={handleLogout} />
            <DesktopNav loggedIn={loggedIn} handleLogout={handleLogout} />

            {/* <div className="nav-menu" id="mobile-nav">
                    <div className="nav-logo">
                        <i class="far fa-lightbulb"></i>
                    </div>
                    {loggedIn ?
                        <div className="nav-menu">
                            <div className="nav-item">
                                <Link to="/">Home</Link>
                            </div>
                            <div className="nav-item">
                                <Link to="/categories">Browse Categories</Link>
                            </div>

                            <div className="nav-item mobile-only-nav-item" id="nav-line-break">
                            </div>

                            <div className="nav-item mobile-only-nav-item">
                                <Link to="/account">My Profile</Link>
                            </div>
                            <div className="nav-item mobile-only-nav-item">
                                <Link to="/new-project">New Project</Link>
                            </div>
                            <div className="nav-item mobile-only-nav-item">
                                <Link to="/user-projects">My Projects</Link>
                            </div>
                            <div className="nav-item mobile-only-nav-item">
                                <Link to="/login" onClick={handleLogout}>Log Out</Link>
                            </div>
                        </div>
                        :
                        <div className="nav-menu">
                            <Link to="/about">About</Link>
                            <Link to="/login">Log In</Link>
                            <Link to="/signup">Sign Up</Link>
                        </div>

                    }

                </div > */}

            {/* Desktop account menu */}
            {/* <div className="nav-menu" id="desktop-nav">
                <div className="nav-logo">
                    <i class="far fa-lightbulb"></i>
                </div>
                {loggedIn ?
                    <div className="nav-menu">
                        <div className="nav-item">
                            <Link to="/">Home</Link>
                        </div>
                        <div className="nav-item">
                            <Link to="/categories">Browse Categories</Link>
                        </div>


                        <div className="nav-item" id="desktop-nav-account-div">
                            <button id="nav-account-btn" onClick={showAccountMenu}>My Account</button>
                            <div id="nav-account-menu" style={displayStyle}>
                                <Link to="/account">My Profile</Link>
                                <Link to="/new-project">New Project</Link>
                                <Link to="/user-projects">My Projects</Link>
                                <Link to="/login" onClick={handleLogout}>Log Out</Link>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="nav-menu">
                        <Link to="/about">About</Link>
                        <Link to="/login">Log In</Link>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                }
            </div > */}
        </Fragment>
    )
}

export default Nav;
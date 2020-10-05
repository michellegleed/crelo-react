import React, { useEffect, useState, useContext, Fragment } from 'react';
import { Link, useLocation } from "react-router-dom";
// import { loggedInUser } from '../../data';
// import { UserDetailsContext } from '../../utils/context';

import './DesktopNav.css';

function DesktopNav(props) {

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
        <nav id="desktop-nav">
            <div id="nav-container">
                <div className="nav-menu">
                    <div className="nav-logo">
                        <i class="far fa-lightbulb"></i>
                    </div>
                    {props.loggedIn ?
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
                                    <Link to="/login" onClick={props.handleLogout}>Log Out</Link>
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
                </div >
            </div>
        </nav >
    )
}

export default DesktopNav;
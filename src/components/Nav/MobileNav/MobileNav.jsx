import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";

import './MobileNav.css';

function MobileNav(props) {

    /// Show/Hide Mobile Nav
    const [displayMenu, setDisplayMenu] = useState(false);

    const displayStyle = {
        display: displayMenu ? "flex" : "none",
        // transform: displayMenu ? "none" : "translate(100%, 0)"
    }

    const showNav = () => {
        setDisplayMenu(true);
        document.addEventListener('click', closeNav);
    }

    const closeNav = () => {
        setDisplayMenu(false);
        document.removeEventListener('click', closeNav);
    }

    return (
        <nav id="mobile-nav">
            <div className="nav-logo">
                <i class="far fa-lightbulb"></i>Crelo
            </div>
            <button id="show-mobile-nav" onClick={showNav}><i class="fas fa-bars"></i></button>
            <div id="mobile-nav-container" style={displayStyle}>
                <button id="close-mobile-nav" onClick={closeNav}><i class="fas fa-times"></i></button>
                <div className="nav-menu">
                    <div className="nav-logo">
                        <i class="far fa-lightbulb"></i>
                    </div>
                    {props.loggedIn ?
                        /* Mobile account menu */
                        <div className="nav-menu">
                            <div className="nav-item mobile-only-nav-item">
                                <Link to="/">Home</Link>
                            </div>
                            <div className="nav-item mobile-only-nav-item">
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
                                <Link to="/login" onClick={props.handleLogout}>Log Out</Link>
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

export default MobileNav;
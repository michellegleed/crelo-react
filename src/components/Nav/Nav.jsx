import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Nav.css';

function Nav() {

    const [showAccountMenu, setShowAccountMenu] = useState(false);

    const toggleAccountMenu = () => {
        setShowAccountMenu(!showAccountMenu);
    }

    const displayStyle = {
        display: showAccountMenu ? "flex" : "none"
    }

    return (
        <nav>
            <div id="nav-container">
                <Link to="/">Home</Link>
                <Link to="/categories">Browse Categories</Link>
                <Link to="/about">About</Link>
                <div id="nav-account-div">
                    <button id="nav-account-btn" onClick={toggleAccountMenu}>My Account</button>
                    <div id="nav-account-menu" style={displayStyle}>
                        <Link to="/account">My Profile</Link>
                        <Link to="/new-project">New Project</Link>
                        <Link to="/user-projects">My Projects</Link>
                        <Link to="/logout">Log Out</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav;
import React from 'react';
import { Link } from "react-router-dom";

import './Nav.css';

function Nav () {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/project">Project</Link>
            <Link to="/about">About</Link>
            <Link to="/user-projects">My Projects</Link>
            <Link to="/account">Account</Link>
        </nav>
    )
}

export default Nav;
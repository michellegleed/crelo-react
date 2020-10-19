import React from 'react';
import { Link } from "react-router-dom";

import './DesktopNav.css';

function DesktopNav(props) {

    return (
        <nav id="desktop-nav">
            <div id="nav-container">
                <div className="nav-menu">
                    <div className="nav-logo">
                        <i class="far fa-lightbulb"></i>
                    </div>
                    {props.loggedIn ?
                        <div className="nav-menu-items">
                            <div className="nav-item">
                                <Link to="/">News Feed</Link>
                            </div>
                            <div className="nav-item">
                                <Link to="/categories">Browse Categories</Link>
                            </div>
                            <div className="nav-item">
                                <Link to="/new-project">New Project</Link>
                            </div>


                            <div className="nav-item" id="desktop-nav-account-div">
                                <a href="#" id="nav-account-btn">My Account</a>
                                <div id="nav-account-menu" >
                                    <Link to="/account">My Profile</Link>
                                    <Link to="/user-projects">My Projects</Link>
                                    <Link to="/login" onClick={props.handleLogout}>Log Out</Link>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="nav-menu-items logged-out">
                            <div className="nav-item">
                                <Link to="/login">Log In</Link>
                            </div>
                            <div className="nav-item">
                                <Link to="/signup">Sign Up</Link>
                            </div>
                        </div>
                    }
                </div >
            </div>
        </nav >
    )
}

export default DesktopNav;
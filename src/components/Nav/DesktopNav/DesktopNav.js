import React from 'react';
import { Link, NavLink } from "react-router-dom";

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
                                <NavLink exact to="/" activeStyle={{ color: 'rgb(4, 180, 4)' }}>News Feed</NavLink>
                            </div>
                            <div className="nav-item">
                                <NavLink to="/categories" activeStyle={{ color: 'rgb(4, 180, 4)' }}>Browse Categories</NavLink>
                            </div>
                            <div className="nav-item">
                                <NavLink to="/new-project" activeStyle={{ color: 'rgb(4, 180, 4)' }}>New Project</NavLink>
                            </div>


                            <div className="nav-item" id="desktop-nav-account-div">
                                <a href="#" id="nav-account-btn">My Account</a>
                                <div id="nav-account-menu" >
                                    <NavLink to="/account" activeStyle={{ color: 'rgb(4, 180, 4)' }}>My Profile</NavLink>
                                    <NavLink to="/user-projects" activeStyle={{ color: 'rgb(4, 180, 4)' }}>My Projects</NavLink>
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
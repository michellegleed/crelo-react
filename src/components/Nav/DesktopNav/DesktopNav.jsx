import React, { useEffect, useState, useContext, Fragment } from 'react';
import { Link, useLocation } from "react-router-dom";
// import { loggedInUser } from '../../data';
// import { UserDetailsContext } from '../../utils/context';

import './DesktopNav.css';

function DesktopNav(props) {

    /// Show/Hide Drop-Down Account Menu
    // const [displayAccountMenu, setDisplayAccountMenu] = useState(false);

    // const showAccountMenu = () => {
    //     setDisplayAccountMenu(true);
    //     document.addEventListener('click', hideAccountMenu);
    // }

    // const hideAccountMenu = () => {
    //     setDisplayAccountMenu(false);
    //     document.removeEventListener('click', hideAccountMenu);
    // }

    // const toggleAccountMenu = () => {
    //     setDisplayAccountMenu(!displayAccountMenu);
    //     if (displayAccountMenu === true) {
    //         document.addEventListener('click', hideAccountMenu);
    //     } else {
    //         document.removeEventListener('click', hideAccountMenu);
    //     }
    // }

    // const displayStyle = {
    //     display: displayAccountMenu ? "flex" : "none"
    // }


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
                                <Link to="/">News Feed</Link>
                            </div>
                            <div className="nav-item">
                                <Link to="/categories">Browse Categories</Link>
                            </div>


                            <div className="nav-item" id="desktop-nav-account-div">
                                <a href="#" id="nav-account-btn">My Account</a>
                                {/* <div id="nav-account-menu" style={displayStyle}> */}
                                <div id="nav-account-menu" >
                                    <Link to="/account">My Profile</Link>
                                    <Link to="/new-project">New Project</Link>
                                    <Link to="/user-projects">My Projects</Link>
                                    <Link to="/login" onClick={props.handleLogout}>Log Out</Link>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="nav-menu">
                            {/* <div className="nav-item">
                                <Link to="/about">About</Link>
                            </div> */}
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
import React, { useEffect, useState, useContext, Fragment } from 'react';
import { useLocation } from "react-router-dom";
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
            if (!userDetails) {
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

    return (
        <Fragment>
            <MobileNav loggedIn={loggedIn} handleLogout={handleLogout} />
            <DesktopNav loggedIn={loggedIn} handleLogout={handleLogout} />
        </Fragment>
    )
}

export default Nav;
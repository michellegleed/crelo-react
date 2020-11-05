import React, { useEffect, useState, useContext, Fragment } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import { UserDetailsContext } from '../../utils/context';
import MobileNav from './MobileNav/MobileNav';
import DesktopNav from './DesktopNav/DesktopNav';

function Nav() {

    const history = useHistory();

    /// Check context for userDetails and if none, fetch userDetails and save to the context
    const { userDetails, actions } = useContext(UserDetailsContext);

    /// Update Nav Based on Logged In/Out
    const [loggedIn, setLoggedIn] = useState(false);

    // location variable will update whenever the react app's url changes
    const location = useLocation();

    // runs @ first render and whenever url location changes
    useEffect(() => {
        console.log("location is ", location)
        const token = window.localStorage.getItem("token");
        if (token) {
            setLoggedIn(true);
            if (!userDetails) {
                console.log("logged in but no user details saved! fetching user details now.");
                actions.fetchUserDetails()
            }
        }
        else {
            setLoggedIn(false);
            if (location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/unauthorized" || location.pathname === "/notfound") {
                return
            }
            history.push("/signup");
        }
    }, [location]);


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
import React, { useState } from 'react';

import FetchDetails from './FetchDetails.js';

export const UserDetailsContext = React.createContext();

export const UserContextProvider = (props) => {
    const [userDetails, setUserDetails] = useState();

    const updateAllDetails = (userObject) => {
        setUserDetails(userObject);
        console.log("user details from context = ", userDetails);
    }

    const updateUserDetails = (userObject) => {
        setUserDetails((prevState) => {
            return {
                ...prevState,
                user: userObject
            }
        });
        console.log("user details from context = ", userDetails);
    }

    const updateLocationDetails = (locationObject) => {
        setUserDetails((prevState) => {
            return {
                ...prevState,
                location: locationObject
            }
        });
    }

    const clearUserDetails = () => {
        setUserDetails({});
    }

    return (
        <UserDetailsContext.Provider value={{
            userDetails: userDetails,
            actions: {
                updateAllDetails: updateAllDetails,
                updateUserDetails: updateUserDetails,
                updateLocationDetails: updateLocationDetails,
                clearDetails: clearUserDetails
            }
        }}>
            {userDetails ?
                props.children
                :
                <FetchDetails />
            }

        </UserDetailsContext.Provider>
    );
}
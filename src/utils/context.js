import React, { useState } from 'react';

export const UserDetailsContext = React.createContext();

export const UserContextProvider = (props) => { 
    const [userDetails, setUserDetails] = useState({});

    const updateUserDetails = (userObject) => { 
        setUserDetails(userObject);
    }

    const clearUserDetails = () => { 
        setUserDetails({});
    }

    return (
        <UserDetailsContext.Provider value={{
            userDetails: userDetails,
            actions: {
                updateDetails: updateUserDetails,
                clearDetails: clearUserDetails
            }
        }}>
            { props.children}
        </UserDetailsContext.Provider>
    );
}
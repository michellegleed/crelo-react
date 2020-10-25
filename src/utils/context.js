import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

// import FetchDetails from './FetchDetails.js';
import { fetchRequest } from './fetchRequest.js';

import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

export const UserDetailsContext = React.createContext();

export const UserContextProvider = (props) => {

    const history = useHistory();

    const fetchingRef = useRef(false);

    const [userDetails, setUserDetails] = useState();
    const [errorMessage, setErrorMessage] = useState();

    const updateAllDetails = (userObject) => {
        console.log("new user object is... ", userObject)
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
        setUserDetails(null);
    }

    const fetchUserDetails = () => {
        if (userDetails) {
            console.log("found user details! exiting fetch.");
            return
        }
        console.log("no user details found! commencing fetch.")
        fetchingRef.current = true;
        fetchRequest(`${process.env.REACT_APP_API_URL}account/`)
            .then((result) => {
                if (result.ok) {
                    console.log("result.data is.. ", result.data)
                    fetchingRef.current = false;
                    updateAllDetails(result.data);
                }
                else {
                    history.push("/login");
                }
            })
            .catch(error => {
                fetchingRef.current = false;
                setErrorMessage(error.message);
            })
    }

    return (
        <UserDetailsContext.Provider value={{
            userDetails: userDetails,
            actions: {
                fetchUserDetails: fetchUserDetails,
                updateAllDetails: updateAllDetails,
                updateUserDetails: updateUserDetails,
                updateLocationDetails: updateLocationDetails,
                clearDetails: clearUserDetails
            }
        }}>
            {
                fetchingRef.current ?
                    <div className="main-container">
                        <div className="content-container">
                            <h2 className="loading">** Loading... **</h2>
                        </div>
                    </div>
                    :
                    errorMessage ?
                        <ErrorMessage message={errorMessage} type="error" />
                        :
                        props.children
            }
        </UserDetailsContext.Provider>
    );
}
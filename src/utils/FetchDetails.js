import React, { useContext, useEffect, useState } from "react";

import { UserDetailsContext } from './context.js';

const FetchDetails = () => {
    const { actions } = useContext(UserDetailsContext);

    const [fetching, setFetching] = useState(false);

    // const [userData, setUserData] = useState();

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        console.log("found token. commencing fetch")
        if (token) {
            setFetching(true);
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
                    console.log(data);
                    // setUserData(data);
                    actions.updateAllDetails(data);
                    console.log("updated context. user name is ", data.user.username)
                    setFetching(false);
                    // console.log("username: ", userData.user.username);
                });
        }
    }, []);

    // const updateAccountDetails = (userDetails) => {
    //     setUserData(prevData => {
    //         return {
    //             ...prevData,
    //             user: userDetails
    //         }
    //     })
    // }

    if (fetching) {
        return <h2>** Loading... **</h2>
    }
    return null;
}

export default FetchDetails;
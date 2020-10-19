import React, { useContext, useEffect, useState } from "react";

import { UserDetailsContext } from './context.js';

const FetchDetails = () => {
    const { actions } = useContext(UserDetailsContext);

    const [fetching, setFetching] = useState(false);

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
                    // Checking to make sure the component we are fetching for is still mounted - don't want to update state on a component that doesn't exist
                    if (fetching === true) {
                        actions.updateAllDetails(data);
                        console.log("updated context. user name is ", data.user.username)
                        setFetching(false);
                    }
                });
        }
        return (() => {
            setFetching(false);
        })
    }, []);

    if (fetching) {
        return <h2>** Loading... **</h2>
    }
    return null;
}

export default FetchDetails;
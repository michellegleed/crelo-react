import React, { useContext, useEffect } from "react";

import { UserDetailsContext } from './context.js';

const FetchDetails = () => {
    const { actions } = useContext(UserDetailsContext);

    // const [userData, setUserData] = useState();

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        console.log("found token. commencing fetch")
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
                    console.log(data);
                    // setUserData(data);
                    actions.updateAllDetails(data);
                    console.log("updated context. user name is ", data.user.username)
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

    return <h1>** Loading... ***</h1>;
}

export default FetchDetails;
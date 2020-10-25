// import React, { useContext, useEffect, useRef } from "react";

// import { UserDetailsContext } from './context.js';

// const FetchDetails = () => {
//     const { actions } = useContext(UserDetailsContext);

//     const fetchingRef = useRef(true);

//     useEffect(() => {
//         const token = window.localStorage.getItem("token");
//         if (token) {
//             console.log("found token. commencing fetch")
//             fetch(`${process.env.REACT_APP_API_URL}account/`, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `token ${token}`
//                 },
//             })
//                 .then((results) => {
//                     return results.json()
//                 })
//                 .then((data) => {
//                     console.log(data);
//                     // Checking to make sure the component we are fetching for is still mounted - don't want to update state on a component that doesn't exist
//                     if (fetchingRef.current) {
//                         actions.updateAllDetails(data);
//                         console.log("updated context. user name is ", data.user.username)
//                         fetchingRef.current = false;
//                     }
//                 });
//         } else {
//             console.log('no token')
//         }
//         return (() => {
//             fetchingRef.current = false;
//         })
//     }, []);

//     if (fetchingRef.current) {
//         return (
//             <div className="main-container">
//                 <div className="content-container">
//                     <h2 className="loading">** Loading... **</h2>
//                 </div>
//             </div>
//         )
//     }
//     return null;
// }

// export default FetchDetails;
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import './UserAccountPage/UserAccountPage.css';

function UserAccountPage() {

    const { userId } = useParams()

    const [userData, setUserData] = useState({});

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}users/${userId}`, {
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
                setUserData(data);

                console.log("username: ", userData.username);
            });
    }, []);

    return (
        <div>
            <div className="account-content">
                <img src={userData.image} className="profile-image-large" />
                <div className="account-page-section" id="user-details">
                    <h1>{userData.username}</h1>
                    <p id="user-bio">{userData.bio}</p>
                </div>
            </div>

            {/* <div className="account-page-section" id="user-profile-projects">
                <h1>Projects:</h1>
                {userData.projects.map((pledge, index) => {
                    return pledge.anonymous ?
                        null
                        :
                        <ProjectCard  />
                })
                }
            </div> */}
        </div>
    );
}

export default UserAccountPage;
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserProfile from '../components/UserProfile/UserProfile';
import ProjectCard from '../components/ActivityFeedCards/ProjectCard/ProjectCard';

// import './UserAccountPage/UserAccountPage.css';

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
        userData.user ?
            <div>
                <UserProfile user={userData.user} location={userData.location} />

                <h1>Projects:</h1>
                <div className="account-page-section" id="activity-content">

                    {userData.projects.map((project, index) => {
                        return project.is_open ?
                            <ProjectCard key={index} project={project} isActivityFeed={false} />
                            :
                            null
                    })
                    }
                </div>
            </div>
            :
            null
    );
}

export default UserAccountPage;
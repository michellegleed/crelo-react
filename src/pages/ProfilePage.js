import React, { useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import UserProfile from '../components/UserProfile/UserProfile';
import ProjectCard from '../components/ActivityFeedCards/ProjectCard/ProjectCard';
import { fetchRequest } from '../utils/fetchRequest';
import Spinner from '../components/Spinner/Spinner';

function UserAccountPage() {

    const { userId } = useParams();

    const history = useHistory();

    const isFetching = useRef(true);

    const [userData, setUserData] = useState({});

    useEffect(() => {
        isFetching.current = true
        fetchRequest(`${process.env.REACT_APP_API_URL}users/${userId}`)
            .then((result) => {
                isFetching.current = false
                if (result.ok) {
                    setUserData(result.data);
                }
                else {
                    history.push("/notfound");
                }
            })
    }, [userId]);

    return (
        isFetching.current ?
            <Spinner />
            :
            userData.user ?
                <div>
                    <UserProfile user={userData.user} location={userData.location} />
                    <h1 className="page-heading">Projects:</h1>
                    <div className="account-page-section" id="activity-content">
                        {
                            userData.projects.length > 0 ?
                                userData.projects.map((project, index) => {
                                    return project.is_open ?
                                        <ProjectCard key={index} project={project} isActivityFeed={false} />
                                        :
                                        null
                                })
                                :
                                <div className="centred-text">
                                    <h2>** None of {userData.user.username}'s projects  are open for funding right now **</h2>
                                </div>

                        }
                    </div>
                </div>
                :
                null
    );
}

export default UserAccountPage;
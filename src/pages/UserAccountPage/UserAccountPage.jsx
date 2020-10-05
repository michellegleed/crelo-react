import React, { useEffect, useState, useContext } from 'react';

import BadgeList from '../../components/BadgeList/BadgeList';
import PledgeCard from '../../components/PledgeCard/PledgeCard';
import UserProfileForm from '../../components/Forms/UserProfileForm/UserProfileForm';
import { UserDetailsContext } from '../../utils/context';

import './UserAccountPage.css';

function UserAccountPage() {

    const { actions } = useContext(UserDetailsContext);

    const [userData, setUserData] = useState({ user: {}, pledges: [], location: {}, projects: [] });

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const token = window.localStorage.getItem("token");
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
                setUserData(data);
                actions.updateAllDetails(data);

                console.log("username: ", userData.user.username);
            });
    }, []);

    const updateAccountDetails = (userDetails) => {
        setUserData(prevData => {
            return {
                ...prevData,
                user: userDetails
            }
        })
    }

    const hideForm = () => {
        setShowForm(false);
    }

    return (
        <div>
            <div className="account-content">
                <img src={userData.user.image} className="profile-image-large" />
                <div className="account-page-section" id="user-details">
                    <h1>{userData.user.username}</h1>
                    <h6><i class="fas fa-map-marker-alt"></i>City of {userData.location.name}</h6>
                    <p id="user-bio">{userData.user.bio}</p>
                    <button onClick={() => setShowForm(true)}>Edit Profile</button>
                </div>
                {showForm ?
                    <div className="account-page-section" id="edit-profile-form">
                        <UserProfileForm user={userData.user} location={userData.location} updateAccountDetails={updateAccountDetails} hideForm={hideForm} />
                    </div>
                    :
                    null}

                <div className="account-page-section" id="user-pledges">
                    <h1>Pledges:</h1>
                    {userData.pledges.map((pledge, index) => {
                        return <PledgeCard pledge={pledge} key={index} />
                    })
                    }
                </div>
            </div>
        </div>
    );
}

export default UserAccountPage;
import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import PledgeCard from '../../components/PledgeCard/PledgeCard';
import UserProfileForm from '../../components/Forms/UserProfileForm/UserProfileForm';
import UserProfile from '../../components/UserProfile/UserProfile';

import { UserDetailsContext } from '../../utils/context';

import './UserAccountPage.css';
import { fetchRequest } from '../../utils/fetchRequest';
import Spinner from '../../components/Spinner/Spinner';

function UserAccountPage() {

    const { actions } = useContext(UserDetailsContext);

    const history = useHistory();

    const isFetching = useRef(true);

    const [userData, setUserData] = useState({ user: {}, pledges: [], location: {}, projects: [] });

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        isFetching.current = true
        fetchRequest(`${process.env.REACT_APP_API_URL}account/`)
            .then((result) => {
                isFetching.current = false
                if (result.ok) {
                    setUserData(result.data);
                    actions.updateAllDetails(result.data);
                }
                else {
                    history.push("/unauthorized");
                }
            })
    }, []);

    const updateAccountDetails = (userDetails) => {
        setUserData(prevData => {
            return {
                ...prevData,
                user: userDetails.user,
                location: userDetails.location
            }
        })
        setShowForm(false);
    }

    return (
        isFetching.current ?
            <Spinner />
            :
            <div>
                <h1 id="page-title">My Profile:</h1>

                <UserProfile user={userData.user} location={userData.location} />

                <div className="profile-form-container">
                    <button onClick={() => setShowForm(true)}>Edit Profile</button>

                    {showForm ?
                        <div className="account-page-section" id="edit-profile-form">
                            <UserProfileForm user={userData.user} location={userData.location} updateAccountDetails={updateAccountDetails} />
                        </div>
                        :
                        null}
                </div>

                <div className="account-page-section" id="user-pledges">
                    <h1>Pledges:</h1>
                    {
                        userData ?
                            userData.pledges.map((pledge, index) => {
                                return <PledgeCard pledge={pledge} isProfilePage={true} key={index} />
                            })
                            :
                            null
                    }
                </div>
            </div>
    );
}

export default UserAccountPage;
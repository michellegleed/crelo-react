import React from 'react';

import './UserProfile.css';

function UserProfile(props) {

    const { user, location } = props;

    return (
        <div className="account-content">
            <img src={user.image} className="profile-image-large" />
            <div className="account-page-section" id="user-details">
                <h1>{user.username}</h1>
                <h6><i class="fas fa-map-marker-alt"></i>City of {location.name}</h6>
                <p id="user-bio">{user.bio}</p>
            </div>
        </div>
    )
}

export default UserProfile;
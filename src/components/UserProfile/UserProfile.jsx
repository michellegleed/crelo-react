import React from 'react';
import Badge from '../Badge/Badge';

import './UserProfile.css';

function UserProfile(props) {

    // destructuring the props
    const { user } = props;

    return (
        <div className="user-profile">
            <img src={user.image} className="profile-image-large" />
            <h4 className="username">{user.username}</h4>
            <p className="user-bio">{user.bio}</p>
        </div>
    );
}

export default UserProfile;
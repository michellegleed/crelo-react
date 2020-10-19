import React from 'react';
import { Link } from 'react-router-dom';

import './CreatorDetails.css';

function CreatorDetails(props) {

    const { user } = props;

    return (
        <div id="creator-details">
            <Link to={`/user/${user.id}`}>
                <img className="sml-user-image" src={user.image} />
                <div>
                    <p>Created by</p>
                    <h3>{user.username}</h3>
                </div>
            </Link>
        </div>
    )

}

export default CreatorDetails;


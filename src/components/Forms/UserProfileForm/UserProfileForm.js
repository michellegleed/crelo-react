import React, { useState, useEffect, useContext } from 'react';
import { UserDetailsContext } from '../../../utils/context';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

import './UserProfileForm.css';

function UserProfileForm(props) {

    // destructuring the props
    const { userDetails, actions } = useContext(UserDetailsContext);

    const { user, hideForm } = props;

    const [profileDetails, setProfileDetails] = useState(user);
    const [errorMessage, setErrorMessage] = useState();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setProfileDetails((prevProfileDetails) => ({
            ...prevProfileDetails,
            [id]: value,
        }));
    }

    const postData = async () => {
        const token = window.localStorage.getItem("token");

        const response = await fetch(`${process.env.REACT_APP_API_URL}account/`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `token ${token}`
            },
            body: JSON.stringify(profileDetails),
        });
        const data = await response.json()
        return {
            ok: response.ok,
            ...data
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postData()
            .then(data => {
                if (data.ok) {
                    setErrorMessage(null);
                    props.updateAccountDetails(data);
                    actions.updateUserDetails(data.user);
                    actions.updateLocationDetails(data.location);
                } else {
                    setErrorMessage("Oops! Both the image URL and bio are required fields. (Because I couldn't work out how to make it optional in Django - sorry!!)");
                }
            })
    }

    /// Get Locations for Select Part of Form
    const [locationList, setLocationList] = useState();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}locations/`)
            .then((results) => {
                return results.json()
            })
            .then((data) => {
                setLocationList(data);
            });
    }, []);

    const checkIfCurrentlySelected = (location) => {
        if (location.id == user.location_id) {
            return <option value={location.id} selected>{location.name}</option>
        }
        return <option value={location.id}>{location.name}</option>
    }

    return (
        <div className="user-profile">
            <form>
                <div id="form-header">
                    <h2>Edit Profile:</h2>
                    {
                        errorMessage ?
                            <ErrorMessage message={errorMessage} type="error" />
                            :
                            null
                    }
                    <button id="close-button" onClick={hideForm}>
                        <i class="fas fa-times"></i>
                    </button>

                </div>

                <div>
                    <label htmlFor="image">Profile Image: </label>
                    <input
                        type="url"
                        id="image"
                        placeholder="Enter image URL"
                        onChange={handleChange}
                    />
                </div>
                <div>

                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        id="username"
                        placeholder={user.username}
                        onChange={handleChange}
                    />
                </div>
                <div>

                    <label htmlFor="location">Location:</label>
                    {locationList ?
                        <div id="location-select-div">
                            <p>City of</p><select id="location_id" name="location" onChange={handleChange}>
                                {locationList.map(location => {
                                    return checkIfCurrentlySelected(location);
                                })}
                            </select>
                        </div>
                        :
                        null
                    }
                </div>
                <div>
                    <label htmlFor="bio">Update Bio:</label>
                    <textarea
                        type="text"
                        id="bio"
                        value={profileDetails.bio}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" onClick={handleSubmit}>
                    Save Changes
            </button>
            </form>
        </div >
    );
}

export default UserProfileForm;
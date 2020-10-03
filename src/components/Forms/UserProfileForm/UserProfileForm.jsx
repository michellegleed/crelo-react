import React, { useState, useEffect } from 'react';

import './UserProfileForm.css';

function UserProfileForm(props) {

    // destructuring the props
    const { user } = props;

    const [profileDetails, setProfileDetails] = useState({
    });

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
        return response.json();
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("stringified profile details: ", JSON.stringify(profileDetails));
        postData().then(response => {
            console.log(response);
            props.updateUserDetails(response.user);
            // redirect to home page on successful login
            // history.push("/");
        });
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
                <div>
                    <img src={user.image} className="profile-image-large" />
                    <label htmlFor="image">Change Profile Image</label>
                    <input
                        type="url"
                        id="image"
                        placeholder="Enter image URL"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <h2>{user.username}</h2>
                    <label htmlFor="username">Change Username</label>
                    <input
                        type="url"
                        id="username"
                        placeholder={user.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <h2>Location:</h2>
                    <label htmlFor="location">Location:</label>
                    {locationList ?
                        <select id="location_id" name="location" onChange={handleChange}>
                            {locationList.map(location => {
                                return checkIfCurrentlySelected(location);
                            })}
                        </select>
                        :
                        null
                    }
                </div>
                <div>
                    <p>{user.bio}</p>
                    <label htmlFor="bio">Update Bio</label>
                    <input
                        type="text"
                        id="bio"
                        placeholder={user.bio}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" onClick={handleSubmit}>
                    Save Changes
            </button>
            </form>
        </div>
    );
}

export default UserProfileForm;
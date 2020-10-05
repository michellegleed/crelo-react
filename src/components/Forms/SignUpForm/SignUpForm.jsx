import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './SignUpForm.css';

function SignUpForm() {

    const history = useHistory();

    const [errorMessage, setErrorMessage] = useState();

    const [userDetails, setUserDetails] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        location_id: 1
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserDetails((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    }

    const postUserData = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}users/`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDetails),
        })
        if (response.ok) {
            return response.json();
        } else {
            response.text().then(text => {
                throw Error(text)
            }).catch(
                (error) => {
                    console.log("errorText = ", error)
                    const errorObj = JSON.parse(error.message)
                    setErrorMessage(errorObj);
                }
            )
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userDetails.email && userDetails.username && userDetails.password && userDetails.confirmPassword && userDetails.location_id) {
            if (userDetails.password === userDetails.confirmPassword) {
                postUserData().then(response => {
                    if (response) {
                        history.push("/login");
                    }
                }).catch((error) => {
                    // do nothing. I think i just need this here in case?
                })
            }
            setErrorMessage("Passwords do not match!");
        }
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

    return (
        <form>
            <div>
                {errorMessage ?
                    <p className="error-message">{errorMessage}</p>
                    : null
                }
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Enter username"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="location">Location:</label>
                {locationList ?
                    <select id="location_id" name="location" onChange={handleChange}>
                        {locationList.map(location => {
                            return <option value={location.id}>{location.name}</option>
                        })}
                    </select>
                    :
                    null
                }
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Enter Password Again"
                    onChange={handleChange} />
            </div>
            <button type="submit" onClick={handleSubmit}>
                Sign Up
            </button>
        </form>
    )
}

export default SignUpForm;
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

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
        // if (response.ok) {
        //     return response.json();
        // } else {
        //     response.text().then(text => {
        //         throw Error(text)
        //     }).catch(
        //         (error) => {
        //             console.log("errorText = ", error)
        //             const errorObj = JSON.parse(error.message)
        //             setErrorMessage(errorObj.detail);
        //         }
        //     )
        // }
        const data = await response.json()
        return {
            ok: response.ok,
            ...data
        }
    }

    const handleSubmit = (e) => {
        console.log(userDetails.password, userDetails.confirmPassword);
        e.preventDefault();
        if (userDetails.email && userDetails.username && userDetails.password && userDetails.confirmPassword && userDetails.location_id) {
            if (userDetails.password !== userDetails.confirmPassword) {
                console.log(userDetails.password, userDetails.confirmPassword);
                setErrorMessage("Passwords do not match!");
            } else {
                // postUserData().then(response => {
                //     if (response.ok) {
                //         console.log("response ok");
                //         history.push("/login");
                //     }
                // }).catch((error) => {
                //     console.log("caught error ", errorMessage);
                //     // do nothing. I think i just need this here in case?
                // })
                postUserData().then(data => {
                    if (data.ok) {
                        console.log(data);
                        console.log("response ok");
                        history.push("/login");
                    } else {
                        // the API returned an error - do something with it
                        console.error(data)
                        setErrorMessage(data.detail);
                    }
                })
            }

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
        <React.Fragment>
            {errorMessage ?
                <ErrorMessage message={errorMessage} type="error" />
                : null
            }
            <form>
                <div className="form-item">
                    <h2>Sign Up</h2>
                </div>
                <div className="form-item">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        onChange={handleChange} />
                </div>
                <div className="form-item">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter username"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-item">
                    <label htmlFor="location">Location (City of):</label>
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
                <div className="form-item">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        onChange={handleChange} />
                </div>
                <div className="form-item">
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
        </React.Fragment>
    )
}

export default SignUpForm;
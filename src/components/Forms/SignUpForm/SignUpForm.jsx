import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function SignUpForm() {

    const history = useHistory();

    const [error, setError] = useState();

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
                    setError(error.message.detail);
                    // alert(error.message)
                }
            )
        }
    }


    const loginNewUser = async () => {
        const credentials = {
            username: userDetails.username,
            password: userDetails.password
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}api-token-auth/`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        return response.json();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userDetails.email && userDetails.username && userDetails.password && userDetails.confirmPassword && userDetails.location_id) {
            // if (userDetails.password === userDetails.confirmPassword) {
            postUserData().then(response => {
                // loginNewUser().then(response => {
                if (response) {
                    window.localStorage.setItem("token", response.token);
                }

                //     // redirect to home page on successful login
                //     history.push("/");
                // })
            }).catch((error) => {
                // setError(error.message);
                alert(error.message)
            })

            // }
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
                {error ?
                    <p>Error Message: {error}</p>
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
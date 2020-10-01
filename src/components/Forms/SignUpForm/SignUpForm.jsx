import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function SignUpForm() {

    const history = useHistory();

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
        console.log(id, value);
    }

    const postUserData = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}users/`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDetails),
        });
        return response.json();
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
        console.log("userDetails = ", userDetails);
        if (userDetails.email && userDetails.username && userDetails.password && userDetails.confirmPassword && userDetails.location_id) {
            if (userDetails.password === userDetails.confirmPassword) {
                postUserData().then(response => {
                    console.log("response =", response);
                    loginNewUser().then(response => {
                        window.localStorage.setItem("token", response.token);
                        // redirect to home page on successful login
                        history.push("/");
                    });
                });
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
        <form>
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
                Login
            </button>
        </form>
    )
}

export default SignUpForm;
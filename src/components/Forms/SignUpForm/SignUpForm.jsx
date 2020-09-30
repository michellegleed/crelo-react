import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function SignUpForm() {

    const [credentials, setCredentials] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        location: 0
    });

    const history = useHistory();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    }

    const postData = async () => {
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
        if (credentials.email && credentials.username && credentials.password && credentials.confirmPassword && credentials.location) {
            postData().then(response => {
                console.log(response);
                window.localStorage.setItem("token", response.token);
                // redirect to home page on successful login
                history.push("/");
            });
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
                    <select id="location" name="location" onChange={handleChange}>
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
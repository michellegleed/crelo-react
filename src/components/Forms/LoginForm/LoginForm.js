import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

import '../SignUpForm/SignUpForm.css';

function LoginForm() {

    const [errorMessage, setErrorMessage] = useState();

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
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
        })
        if (response.ok) {
            return response.json();
        } else {
            response.text().then(text => {
                throw Error(text)
            }).catch(
                (error) => {
                    const errorObj = JSON.parse(error.message);
                    // console.log(errorObj);
                    setErrorMessage(errorObj.non_field_errors[0]);
                }
            )
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (credentials.username && credentials.password) {
            postData().then(response => {
                console.log(response);
                window.localStorage.setItem("token", response.token);
                // redirect to home page on successful login
                history.push("/");
            })
                .catch(
                    (error) => {
                        // const errorObj = JSON.parse(error.message);
                        // console.log(errorObj);
                        // setErrorMessage(errorObj.non_field_errors[0]);
                    }
                )
        } else {
            setErrorMessage("All fields are required");
        }
    }

    return (
        <React.Fragment>
            {errorMessage ?
                <ErrorMessage message={errorMessage} type="error" />
                : null
            }
            <form>
                <div className="form-item">
                    <h2>Log In</h2>
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
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        onChange={handleChange} />
                </div>
                <button type="submit" onClick={handleSubmit}>
                    Login
            </button>
            </form>
        </React.Fragment>
    )
}

export default LoginForm;
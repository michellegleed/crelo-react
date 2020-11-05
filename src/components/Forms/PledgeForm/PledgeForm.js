import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import './PledgeForm.css';

function PledgeForm(props) {

    const { projectID, pledgetype } = props;

    const history = useHistory();

    const [pledgeDetails, setPledgeDetails] = useState({
        comment: "",
        amount: 0,
        anonymous: false
    });

    const postData = async () => {
        const token = window.localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_API_URL}projects/${projectID}/pledges/`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `token ${token}`
            },
            body: JSON.stringify(pledgeDetails),
        });
        return response.json();
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setPledgeDetails((prevPledgeDetails) => ({
            ...prevPledgeDetails,
            [id]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        postData()
            .then(response => {
                // redirect to project page on successful post
                const form = document.querySelector('form');
                form.reset();
                history.push(`/project/${projectID}`)
            })
            .catch(error => history.push("/network-error"))
    }

    return (
        <div id="pledge-form">
            <h3 className="page-subheading">Make A Pledge...</h3>
            <form id="pledge-form">
                <div className="form-item">
                    <span id="funding-target">
                        <label htmlFor="amount">Amount:</label>
                        {pledgetype === 1 ? <p>$</p> : null}
                        <input
                            type="text"
                            id="amount"
                            onChange={handleChange} />
                        {pledgetype === 2 ? <p>hrs</p> : null}
                    </span>
                </div>
                <div className="form-item">
                    <label htmlFor="comment">Comment:</label>
                    <input
                        type="textfield"
                        id="comment"
                        onChange={handleChange} />
                </div>
                <div className="form-item">
                    <label htmlFor="anonymous">Anonymous:</label>
                    <input
                        type="checkbox"
                        id="anonymous"
                        onChange={handleChange} />
                </div>
                <button type="submit" onClick={handleSubmit}>
                    Send Pledge!
            </button>
            </form>
        </div>
    );
}

export default PledgeForm;

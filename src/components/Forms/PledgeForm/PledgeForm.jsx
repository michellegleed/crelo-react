import React, { useState } from "react";

function PledgeForm(props) {

    const { project } = props;

    const [pledgeDetails, setPledgeDetails] = useState({
        comment: "",
        amount: 1,
        anonymous: false
    });

    console.log("project data is ", project)

    const postData = async () => {
        console.log("project id is ", project.id);
        const token = window.localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_API_URL}projects/${project.id}/pledges/`, {
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

        postData().then(response => {
            console.log(response);
            // redirect to project page on successful post
            // history.push(`project/${response.id}`);
            alert("Pledge successful");
        });
    }

    return (
        <div id="pledge-form">
            <h3>Make A Pledge...</h3>
            <form>
                <div>
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="text"
                        id="amount"
                        onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="comment">Comment:</label>
                    <input
                        type="textfield"
                        id="comment"
                        onChange={handleChange} />
                </div>
                <div>
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

import React from "react";

function PledgeForm(props) {

    const postData = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}projects/${project_id}/pledges/`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `token ${token}`
            },
            body: JSON.stringify(projectDetails),
        });
        return response.json();
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
                <input placeholder="Enter amount" id="pledge-value"></input>
                <textarea placeholder="Add a comment" id="pledge-comment"></textarea>
                <label for="anonymous">Keep this anonymous</label>
                <input type="checkbox" id="anonymous"></input>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default PledgeForm;

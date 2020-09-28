import React from "react";

function PledgeForm (props) {
    return (
        <div id="pledge-form">
            <h3>Make A Pledge...</h3>
            <form>
                <input placeholder="Enter amount" id="pledge-value"></input>
                <textarea placeholder="Add a comment" id="pledge-comment"></textarea>
                <label for="anonymous">Keep this anonymous</label>
                <input type="checkbox" id="anonymous"></input>
                <button>Submit</button>
            </form>
        </div>
    );
}

export default PledgeForm;

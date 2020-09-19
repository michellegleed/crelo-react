import React from 'react';
import { Link } from "react-router-dom";

import './PledgeCard.css';

function PledgeCard(props) {

    // destructuring the props
    const { pledge } = props;

    return (
        <div className="pledge-card">
            <p><Link to="/user">{pledge.user}</Link> pledged ${pledge.amount}</p> 
        </div>
    );
}

export default PledgeCard;
import React from 'react';
import { Link } from "react-router-dom";

import { dateObjectFormatter } from '../../utils/dateFormatter.js'

import './PledgeCard.css';

function PledgeCard(props) {

    // destructuring the props
    const { pledge } = props;

    const dateObj = dateObjectFormatter(pledge.date_created);

    return (
        <div className="pledge-card">
            <Link to="/user">
                <img src="" />
                <div className="pledge-text">
                    <h5>{pledge.type_id == 1 ? `$${pledge.amount}` : pledge.type_id == 2 ? `${pledge.amount} hrs` : null
                    }</h5>
                    <p>{pledge.comment}</p>
                    <p><span className="username-bold">{pledge.user}</span>{dateObj.day} {dateObj.date}</p>
                    <p></p>
            </div>
            </Link>

            {/* checking if $ or hrs... */}


        </div>
    );
}

export default PledgeCard;
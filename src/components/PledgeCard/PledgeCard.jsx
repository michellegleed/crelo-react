import React from 'react';
import { Link } from "react-router-dom";

import { dateObjectFormatter } from '../../utils/dateFormatter.js';

import './PledgeCard.css';

function PledgeCard(props) {

    // destructuring the props
    const { pledge } = props;

    const dateObj = dateObjectFormatter(pledge.date);

    return (
        <div className="pledge-card">
            <Link to="/user" className="pledge-user-img-wrapper">
                {
                    pledge.user.image ?
                        <img src={pledge.user.image} className="pledge-user-image" />
                        :
                        <h1><i class="fas fa-user"></i></h1>
                }
            </Link>

            {/* <div className="pledge-text"> */}
            {/* checking if $ or hrs... */}
            <h5 className="pledge-value">{pledge.type_id == 1 ? `$${pledge.amount}` : pledge.type_id == 2 ? `${pledge.amount} hrs` : null
            }</h5>
            <p className="pledge-comment">{pledge.comment}</p>
            {/* <p ><span className="username-bold">{pledge.user.username}</span>{dateObj.day} {dateObj.date}</p> */}
            <div className="pledge-info">
                <p className="pledge-username">{pledge.user.username}</p>
                <p className="pledge-date">{dateObj.day} {dateObj.date}</p>
            </div>


            {/* </div> */}





        </div>
    );
}

export default PledgeCard;
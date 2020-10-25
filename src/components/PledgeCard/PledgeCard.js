import React from 'react';
import { Link } from "react-router-dom";

import { dateObjectFormatter } from '../../utils/dateFormatter.js';

import './PledgeCard.css';

function PledgeCard(props) {

    // destructuring the props
    const { pledge, isProfilePage } = props;

    const dateObj = dateObjectFormatter(pledge.date);

    return (
        <div className="pledge-card">
            {
                isProfilePage ?
                    <React.Fragment>
                        <Link to={`/project/${pledge.project.id}`} className="pledge-user-img-wrapper">
                            <img src={pledge.project.image} className="pledge-user-image" />
                        </Link>

                        < h5 className="pledge-value">{pledge.type_id == 1 ? `$${pledge.amount}` : pledge.type_id == 2 ? `${pledge.amount} hrs` : null
                        }</h5>
                        <p className="pledge-comment">{pledge.comment}</p>
                        <div className="pledge-info">
                            <p className="pledge-username">{pledge.project.title}</p>
                            <p className="pledge-date">{dateObj.day} {dateObj.date}</p>
                        </div>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Link to={`/user/${pledge.user.id}`} className="pledge-user-img-wrapper">
                            {
                                pledge.user.image && !pledge.anonymous ?
                                    <img src={pledge.user.image} className="pledge-user-image" />
                                    :
                                    <h1><i class="fas fa-user"></i></h1>
                            }
                        </Link>
                        <h5 className="pledge-value">{pledge.type_id == 1 ? `$${pledge.amount}` : pledge.type_id == 2 ? `${pledge.amount} hrs` : null
                        }</h5>
                        <p className="pledge-comment">{pledge.comment}</p>
                        <div className="pledge-info">
                            <p className="pledge-username">{pledge.anonymous ? "Anonymous" : pledge.user.username}</p>
                            <p className="pledge-date">{dateObj.day} {dateObj.date}</p>
                        </div>
                    </React.Fragment>
            }
        </div >
    );
}

export default PledgeCard;
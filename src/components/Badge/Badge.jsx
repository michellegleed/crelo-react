import React from 'react';

import { dateObjectFormatter } from '../../utils/dateFormatter.js'

// import './Badge.css';

function Badge(props) {

    // destructuring the props
    const { title, icon, date } = props;

    const dateObj = dateObjectFormatter(date);

    return (
        <div className="badge">
            <div className="badge-icon">
                <i className={icon}></i>
            </div>
            <h4 className="badge-title">{title}</h4>
            <p className="badge-date">{dateObj.date}</p>
        </div>
    );
}

export default Badge;
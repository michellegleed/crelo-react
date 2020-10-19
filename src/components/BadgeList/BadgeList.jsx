import React from 'react';
import Badge from '../Badge/Badge';

// import './BadgeList.css';

function BadgeList(props) {

    // destructuring the props
    const { badgeList } = props;

    return (
        <div className="badge-list">
            <div>
                {badgeList.map((badge, index) => {
                    return <Badge title={badge.title} icon={badge.icon} date={badge.date} key={index} />
                })}
            </div>
        </div>
    );
}

export default BadgeList;
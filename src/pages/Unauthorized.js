import React from 'react';

import { Link } from "react-router-dom";

function Unauthorized() {
    return (
        <div className="main-container" id="container-404">
            <h1 id="title-404"><span className="coloured-text">4</span>0<span className="coloured-text">1</span></h1>
            <h3>You are not authorized to view this page. You may need to <Link className="coloured-text" to="login/">log in.</Link></h3>
        </div>
    )
}

export default Unauthorized;
import React from 'react';

import { Link } from "react-router-dom";
import LoginForm from '../components/Forms/LoginForm/LoginForm';
import About from '../components/AboutCrelo/AboutCrelo';

function Unauthorized404() {
    return (
        <div className="main-container" id="container-404">
            <h1 id="title-404"><span className="coloured-text">4</span>0<span className="coloured-text">4</span></h1>
            <h3>You are not authorized<sup>*</sup> to view this page. You may need to <Link className="coloured-text" to="login/">log in.</Link></h3>
            <h6>*Or this page may not exist.</h6>
        </div>
    )
}

export default Unauthorized404;
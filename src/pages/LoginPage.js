import React from 'react';
import LoginForm from '../components/Forms/LoginForm/LoginForm';
import About from '../components/AboutCrelo/AboutCrelo';

function LoginPage() {
    return (
        <div className="landing-page-main-container">
            <h1><span className="coloured-text">Cre</span>ative. <span className="coloured-text">Lo</span>cal.</h1>
            <div className="landing-content">
                <div className="sign-up-form">
                    <LoginForm />
                </div>
                <About />
            </div>
        </div>
    )
}

export default LoginPage;
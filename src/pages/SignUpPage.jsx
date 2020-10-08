import React from 'react';
import SignUpForm from '../components/Forms/SignUpForm/SignUpForm';
import About from '../components/AboutCrelo/AboutCrelo';

function SignUpPage() {
    return (
        <div className="landing-page-main-container">
            <h1><span className="coloured-text">Cre</span>ative. <span className="coloured-text">Lo</span>cal.</h1>
            <div className="landing-content">
                <div className="sign-up-form">
                    <SignUpForm />
                </div>
                <About />
            </div>
        </div>
    )

}

export default SignUpPage;
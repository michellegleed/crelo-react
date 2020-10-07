import React from 'react';
import SignUpForm from '../components/Forms/SignUpForm/SignUpForm';
import About from '../components/AboutCrelo/AboutCrelo';

function SignUpPage() {
    return (
        <div className="landing-page-main-container">
            <About />
            <SignUpForm />
        </div>
    )

}

export default SignUpPage;
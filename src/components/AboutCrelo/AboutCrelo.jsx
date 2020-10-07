import React from 'react';

function About() {
    return (
        <div >
            <h1><span className="coloured-text">Cre</span>ative. <span className="coloured-text">Lo</span>cal.</h1>

            <h2>The Mission</h2>
            <p>Crelo is all about championing local projects! It is a way of connecting with your neighbors and local community and helping to make the shire you live in a more beautiful, vibrant place.</p>

            <h2>How It Works</h2>
            <p><span className="coloured-text">Sign up to start pledging!</span> We won't send you any annoying emails (but if you're worried, you can make up an email address since, you know, this whole  website is fake).</p>
            <p><span className="coloured-text">Got a great idea to improve your local area?</span> Sign in to create a new project - each project is targeted to the Crelo users in your local area, so you can be assured that it will be seen by the people who will care about it (and utilise it) the most!</p>

            {/* <h1><span className="coloured-text">Crelo.</span></h1> */}
        </div>
    );
}

export default About;
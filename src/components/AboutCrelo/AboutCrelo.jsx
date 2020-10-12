import React from 'react';

import './AboutCrelo.css';

function About() {
    return (
        <div id="about-crelo">

            <section>
                <h2>The Mission</h2>
                <p>Crelo is all about championing local projects! It is a way of connecting with your neighbors and local community and helping to make the shire you live in a more beautiful, vibrant place.</p>
            </section>

            <section>
                <h2>How It Works</h2>
                <p><span className="coloured-text">Sign up to start pledging!</span> We won't send you any annoying emails. We won't even chase you for the money (because, you know, this whole website is fake). It's guaranteed risk-free pledging! Go nuts!</p>
                <p><span className="coloured-text">Got a great idea to improve your local area?</span> Sign in to create a new project - each project is targeted to the Crelo users living in your shire, so you can be assured that it will be seen by the people who will care about it (and utilise it) the most!</p>
            </section>

            {/* <h1><span className="coloured-text">Crelo.</span></h1> */}
        </div>
    );
}

export default About;
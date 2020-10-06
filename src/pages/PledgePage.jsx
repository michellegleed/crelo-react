import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import ProjectDetailCard from "../../components/ProjectDetailCard/ProjectDetailCard";

import PledgeForm from "../../components/Forms/PledgeForm/PledgeForm.jsx";

function PledgePage() {

    const [projectData, setProjectData] = useState({ user: {}, updates: [], pledges: [] });

    const { id } = useParams();

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}projects/${id}/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `token ${token}`
            },
        })
            .then(results => {
                return results.json();
            })
            .then(data => {
                setProjectData(data);
                console.log(data);
            })
    }, [id]);

    useEffect(() => {
        setDateObj(dateObjectFormatter(projectData.date_created));
        setTimeLeftObj(timeLeftFormatter(projectData.due_date));
        setDueDateObj(dateObjectFormatter(projectData.due_date));
    }, [projectData]);


    return (
        <div id="pledge-page-container">


            <PledgeForm />

            <div className="project-content">
                <ProjectDetailCard image={projectData.image} date={projectData.date_created} content={projectData.description} />
                <ProgressBar
                    percentage={projectData.current_percentage_pledged}
                    current={projectData.current_amount_pledged}
                    goal={projectData.goal_amount}
                />
                <h4>Target: ${projectData.goal_amount}</h4>
                <h4>Pledged: ${projectData.current_amount_pledged}</h4>
                <h6><i class="fas fa-map-marker-alt"></i>{projectData.venue == "" ? `City of ${projectData.location}` : `${projectData.venue}, City of ${projectData.location}`}</h6>
                {projectData ?
                    <div id="creator-details">
                        <img className="sml-user-image" src={projectData.user.image} />
                        <div>
                            <p>Created by</p>
                            <h3>{projectData.user.username}</h3>
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        </div>
    );
}

export default PledgePage;

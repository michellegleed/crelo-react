import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import './PledgePage.css';

import ProjectDetailCard from "../../components/ProjectDetailCard/ProjectDetailCard";

import ProjectCard from "../../components/ActivityFeedCards/ProjectCard/ProjectCard";

import PledgeForm from "../../components/Forms/PledgeForm/PledgeForm.jsx";

import { dateObjectFormatter, timeLeftFormatter } from "../../utils/dateFormatter.js";

import ProgressBar from '../../components/ProgressBar/ProgressBar.jsx';

function PledgePage() {

    const [dateObj, setDateObj] = useState({});
    const [timeLeftObj, setTimeLeftObj] = useState({});
    const [dueDateObj, setDueDateObj] = useState({});

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

            {/* <img src={projectData.image} id="pledge-page-header-img" />
            <h1>{projectData.title}</h1> */}
            {/* <ProjectCard image={projectData.image} date={projectData.date_created} content="" /> */}

            <div id="pledge-project-info-container">
                <img src={projectData.image} id="pledge-page-header-img" />
                <h1 className="card-title">{projectData.title} {projectData.venue != "" ? `@ ${projectData.venue}` : null}</h1>
            </div>

            <PledgeForm projectID={projectData.id} pledgetype={projectData.pledgetype} />

        </div>
    );
}

export default PledgePage;

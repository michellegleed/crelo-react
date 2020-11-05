import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import './PledgePage.css';

import PledgeForm from "../../components/Forms/PledgeForm/PledgeForm.js";

import { dateObjectFormatter, timeLeftFormatter } from "../../utils/dateFormatter.js";
import { fetchRequest } from "../../utils/fetchRequest";

function PledgePage() {

    const [dateObj, setDateObj] = useState({});
    const [timeLeftObj, setTimeLeftObj] = useState({});
    const [dueDateObj, setDueDateObj] = useState({});

    const [projectData, setProjectData] = useState({ user: {}, updates: [], pledges: [] });

    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        fetchRequest(`${process.env.REACT_APP_API_URL}projects/${id}/`)
            .then((result) => {
                if (result.ok) {
                    console.log(result.data);
                    setProjectData(result.data);
                }
                else {
                    history.push("/notfound");
                }
            })
    }, [id]);

    useEffect(() => {
        setDateObj(dateObjectFormatter(projectData.date_created));
        setTimeLeftObj(timeLeftFormatter(projectData.due_date));
        setDueDateObj(dateObjectFormatter(projectData.due_date));
    }, [projectData]);

    return (
        <div id="pledge-page-container">
            <div id="pledge-project-info-container">
                <img src={projectData.image} id="pledge-page-header-img" />
                <h1 className="page-title">{projectData.title} {projectData.venue != "" ? `@ ${projectData.venue}` : null}</h1>
            </div>

            <PledgeForm projectID={projectData.id} pledgetype={projectData.pledgetype} />

        </div>
    );
}

export default PledgePage;

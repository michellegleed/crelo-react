import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";

import './PledgePage.css';

import PledgeForm from "../../components/Forms/PledgeForm/PledgeForm.js";
import Spinner from "../../components/Spinner/Spinner";

import { dateObjectFormatter, timeLeftFormatter } from "../../utils/dateFormatter.js";
import { fetchRequest } from "../../utils/fetchRequest";


function PledgePage() {

    const isFetching = useRef(true);

    const [dateObj, setDateObj] = useState({});
    const [timeLeftObj, setTimeLeftObj] = useState({});
    const [dueDateObj, setDueDateObj] = useState({});

    const [projectData, setProjectData] = useState({ user: {}, updates: [], pledges: [] });

    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        isFetching.current = true
        fetchRequest(`${process.env.REACT_APP_API_URL}projects/${id}/`)
            .then((result) => {
                isFetching.current = false
                if (result.ok) {
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
        isFetching.current ?
            <Spinner />
            :
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

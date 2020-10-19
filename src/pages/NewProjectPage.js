import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NewProjectForm from '../components/Forms/NewProjectForm/NewProjectForm';

function NewProjectPage() {

    return (
        <div className="main-container">
            <NewProjectForm />
        </div>
    );
}

export default NewProjectPage;
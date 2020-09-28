import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NewProjectForm from '../components/NewProjectForm/NewProjectForm';



function NewProjectPage() {

    return (
        <NewProjectForm />
    );
}

export default NewProjectPage;
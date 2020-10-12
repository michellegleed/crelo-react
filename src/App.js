import React, { useState } from 'react';
/// Here we are kind of casting BrowserRouter - so we are importing the whole BrowserRouter but then we're also adding references to the parts of it that we want to refer to in our App function.
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';

import ProjectPage from './pages/ProjectPage/ProjectPage';
import ActivityFeed from './pages/ActivityFeed/ActivityFeed';
// import ProjectList from './pages/ProjectList';
// import AboutPage from './pages/AboutPage';
import UserAccountPage from './pages/UserAccountPage/UserAccountPage';
import UserProjectsPage from './pages/UserProjectsPage';
import LoginPage from './pages/LoginPage';
import NewProjectPage from './pages/NewProjectPage';
import BrowseCategoriesPage from './pages/BrowseCategories/BrowseCategoriesPage';
import BrowseLocationsPage from './pages/BrowseLocations/BrowseLocationsPage';
import SignUpPage from './pages/SignUpPage';
import UpdateProjectPage from './pages/UpdateProjectPage';
import PledgePage from './pages/PledgePage/PledgePage';
import Unauthorized404 from './pages/404Page';

import LoadingProvider from './utils/LoadingProvider.jsx';
import { UserContextProvider } from './utils/context';



function App() {

  return (

    <Router>
      <div>
        <UserContextProvider>
          <Nav />
          <div id="main-container">
            {/* <LoadingProvider> */}
            <Switch>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/signup">
                <SignUpPage />
              </Route>
              <Route path="/unauthorized">
                <Unauthorized404 />
              </Route>
              {/* using react-params for the project ID */}
              <Route path="/project/:id/update">
                <UpdateProjectPage />
              </Route>
              <Route path="/project/:id/pledge">
                <PledgePage />
              </Route>
              <Route path="/project/:id">
                <ProjectPage />
              </Route>
              <Route path="/new-project">
                <NewProjectPage />
              </Route>
              <Route path="/categories">
                <BrowseCategoriesPage />
              </Route>
              <Route path="/locations">
                <BrowseLocationsPage />
              </Route>
              <Route path="/user-projects">
                <UserProjectsPage />
              </Route>
              <Route path="/account">
                <UserAccountPage />
              </Route>
              <Route path="/">
                <ActivityFeed />
              </Route>
            </Switch>
            {/* </LoadingProvider> */}
          </div>
          <Footer />
        </UserContextProvider>
      </div>

    </Router>

  )
}

export default App;
import React, { useState, useEffect, useContext } from 'react';
/// Here we are kind of casting BrowserRouter - so we are importing the whole BrowserRouter but then we're also adding references to the parts of it that we want to refer to in our App function.
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import Unauthorized from './pages/Unauthorized';
import NetworkError from './pages/NetworkError';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProjectPage from './pages/ProjectPage/ProjectPage';
import ActivityFeed from './pages/ActivityFeed/ActivityFeed';
import UserAccountPage from './pages/UserAccountPage/UserAccountPage';
import UserProjectsPage from './pages/UserProjectsPage';
import ProfilePage from './pages/ProfilePage';
import NewProjectPage from './pages/NewProjectPage';
import BrowseCategoriesPage from './pages/BrowseCategories/BrowseCategoriesPage';
import BrowseLocationsPage from './pages/BrowseLocations/BrowseLocationsPage';
import UpdateProjectPage from './pages/UpdateProjectPage/UpdateProjectPage';
import PledgePage from './pages/PledgePage/PledgePage';

import { UserContextProvider } from './utils/context';


function App() {
  return (

    <Router>
      <div>
        <UserContextProvider>
          <Nav />
          <div id="main-container">
            <Switch>
              <Route path="/" exact>
                <ActivityFeed />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/signup">
                <SignUpPage />
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
              <Route path="/user/:userId">
                <ProfilePage />
              </Route>
              <Route path="/user-projects">
                <UserProjectsPage />
              </Route>
              <Route path="/account">
                <UserAccountPage />
              </Route>
              <Route path="/unauthorized">
                <Unauthorized />
              </Route>
              <Route path="/network-error">
                <NetworkError />
              </Route>
              <Route path="/">
                <NotFound />
              </Route>
            </Switch>
          </div>
          <Footer />
        </UserContextProvider>
      </div>

    </Router>

  )
}

export default App;
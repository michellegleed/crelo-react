import React from 'react';
/// Here we are kind of casting BrowserRouter - so we are importing the whole BrowserRouter but then we're also adding references to the parts of it that we want to refer to in our App function.
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';

import ProjectPage from './pages/ProjectPage';
import ActivityFeed from './pages/ActivityFeed/ActivityFeed';
import ProjectList from './pages/ProjectList';
import AboutPage from './pages/AboutPage';
import UserAccountPage from './pages/UserAccountPage';
import UserProjectsPage from './pages/UserProjectsPage';
import LoginPage from './pages/LoginPage';
import NewProjectPage from './pages/NewProjectPage';
import BrowseCategoriesPage from './pages/BrowseCategoriesPage';
import SignUpPage from './pages/SignUpPage';

import LoadingProvider from './utils/LoadingProvider.jsx';



function App() {



  return (

    <Router>
      <div>
        <Nav />
        <LoadingProvider>
        <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/signup">
              <SignUpPage />
            </Route>
            {/* using react-params for the project ID */}
            <Route path="/project/:id">
              <ProjectPage />
            </Route>
            <Route path="/new-project">
              <NewProjectPage />
            </Route>
            <Route path="/categories">
              <BrowseCategoriesPage />
            </Route>
            {/* <Route path="/favourites">
            <ProjectList />
          </Route> */}
            <Route path="/about">
              <AboutPage />
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
           </LoadingProvider>
        <Footer />
      </div>
    </Router>

  )
}

export default App;
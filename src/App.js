import React from 'react';
/// Here we are kind of casting BrowserRouter - so we are importing the whole BrowserRouter but then we're also adding references to the parts of it that we want to refer to in our App function.
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';

import ProjectPage from './pages/ProjectPage';
import HomePage from './pages/ActivityFeed';
import AboutPage from './pages/AboutPage';
import UserAccountPage from './pages/UserAccountPage';
import UserProjectsPage from './pages/UserProjectsPage';



function App() {
  return (
    <Router>
      <div>
        <Nav />

        <Switch>
          <Route path="/project">
            <ProjectPage />
          </Route>
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
            <HomePage />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App;
import React from 'react';
/// Here we are kind of casting BrowserRouter - so we are importing the whole BrowserRouter but then we're also adding references to the parts of it that we want to refer to in our App function.
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Nav from './components/Nav/Nav';
import ProjectPage from './pages/ProjectPage';
import HomePage from './pages/HomePage';



function App () {
  return (
      <Router>
        <div>
          <Nav />

          <Switch>
            <Route path="/project">
              <ProjectPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
  )
}

export default App;
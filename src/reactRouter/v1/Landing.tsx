import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FamilyList from './components/FamilyList';
import SquirrelList from './components/SquirrelList';
import SquirrelDetail from './components/SquirrelDetail';

const Landing = () => {
  return (
    <Router>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 200,
            height: 300,
            backgroundColor: 'yellow',
          }}
        >
          <Route
            path="/:version"
          >
            <FamilyList />
          </Route>
        </div>
        <div
          style={{
            display: 'flex',
            width: 200,
            height: 300,
            backgroundColor: 'green',
          }}
        >
          <Route
            path="/:version/:familyName"
          >
            <SquirrelList />
          </Route>
        </div>
        <div
          style={{
            display: 'flex',
            width: 200,
            height: 300,
            backgroundColor: 'orange',
          }}
        >
          <Route
            path="/:version/:familyName/:squirrelID"
          >
            <SquirrelDetail />
          </Route>
        </div>
      </div>
    </Router>
  );
}

export default Landing;

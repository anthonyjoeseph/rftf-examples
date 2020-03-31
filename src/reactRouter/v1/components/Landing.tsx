import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FamilyList from './FamilyList';
import SquirrelList from './SquirrelList';
import SquirrelDetail from './SquirrelDetail';
import Login from './Login';

const Landing = () => {
  return (
    <Router>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Route
          path="/:version/"
        >
          <div
            style={{
              width: 200,
              height: 100,
              backgroundColor: 'beige',
            }}
          >
            <Login />
          </div>
        </Route>
        <div
          style={{
            display: 'flex',
            width: 200,
            height: 300,
            backgroundColor: 'yellow',
          }}
        >
          <Route
            path="/:version/squirrels"
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
            path="/:version/squirrels/:familyName"
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
            path="/:version/squirrels/:familyName/:squirrelID"
          >
            <SquirrelDetail />
          </Route>
        </div>
      </div>
    </Router>
  );
}

export default Landing;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FamilyList from '../v1/components/FamilyList';
import SquirrelList from '../v1/components/SquirrelList';
import SquirrelDetail from '../v1/components/SquirrelDetail';
import Login from '../v2/components/Login';

const Landing = () => {
  return (
    <Router>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Switch>
          <Route
            exact
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
        </Switch>
      </div>
    </Router>
  );
}

export default Landing;

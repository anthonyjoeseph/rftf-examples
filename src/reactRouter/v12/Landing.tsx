import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FamilyList from '../v1/components/FamilyList';
import SquirrelList from '../v1/components/SquirrelList';
import SquirrelDetail from '../v1/components/SquirrelDetail';
import Login from '../v2/components/Login';
import BeautyContainer from '../v1/components/BeautyContainer';

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
            <BeautyContainer backgroundColor='beige'>
              <Login />
            </BeautyContainer>
          </Route>
          <Route>
            <BeautyContainer backgroundColor='yellow'>
              <Route path="/:version/loggedIn" >
                <FamilyList />
              </Route>
            </BeautyContainer>
            <BeautyContainer backgroundColor='green'>
              <Route path="/:version/loggedIn/:familyName" >
                <SquirrelList />
              </Route>
            </BeautyContainer>
            <BeautyContainer backgroundColor='orange'>
              <Route path="/:version/loggedIn/:familyName/:squirrelID" >
                <SquirrelDetail />
              </Route>
            </BeautyContainer>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Landing;

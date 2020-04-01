import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FamilyList from '../v1/components/FamilyList';
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
          <>
            <BeautyContainer backgroundColor='yellow'>
              <Route path="/:version/loggeIn" >
                <FamilyList />
              </Route>
            </BeautyContainer>
          </>
        </Switch>
      </div>
    </Router>
  );
}

export default Landing;

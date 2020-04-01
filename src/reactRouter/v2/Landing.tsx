import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FamilyList from '../v1/components/FamilyList';
import SquirrelList from '../v1/components/SquirrelList';
import SquirrelDetail from '../v1/components/SquirrelDetail';
import Login from './components/Login';
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
        <Route path="/:version/" >
          <BeautyContainer backgroundColor='beige'>
            <Login />
          </BeautyContainer>
        </Route>
        <BeautyContainer backgroundColor='yellow'>
          <Route path="/:version/loggedIn/" >
            <FamilyList />
          </Route>
        </BeautyContainer>
        <BeautyContainer backgroundColor='green'>
          <Route path="/:version/logedIn/:familyName/" >
            <SquirrelList />
          </Route>
        </BeautyContainer>
        <BeautyContainer backgroundColor='orange'>
          <Route path="/:version/loggedIn/:familyName/:squirrelID/" >
            <SquirrelDetail />
          </Route>
        </BeautyContainer>
      </div>
    </Router>
  );
}

export default Landing;

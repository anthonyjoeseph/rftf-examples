import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FamilyList from './components/FamilyList';
import SquirrelList from './components/SquirrelList';
import SquirrelDetail from './components/SquirrelDetail';
import BeautyContainer from './components/BeautyContainer';

const Landing = () => {
  return (
    <Router>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <BeautyContainer backgroundColor='yellow'>
          <Route path="/:version/" >
            <FamilyList />
          </Route>
        </BeautyContainer>
        <BeautyContainer backgroundColor='green'>
          <Route path="/:version/:familyName/" >
            <SquirrelList />
          </Route>
        </BeautyContainer>
        <BeautyContainer backgroundColor='orange'>
          <Route path="/:version/:familyName/:squirrelID/" >
            <SquirrelDetail />
          </Route>
        </BeautyContainer>
      </div>
    </Router>
  );
}

export default Landing;

import React from 'react';
import {
  BrowserRouter as Router, Route,
  Switch, RouteComponentProps,
} from 'react-router-dom';
import FamilyList from './components/FamilyList';
import SquirrelList from './components/SquirrelList';
import SquirrelDetail from '../v13/components/SquirrelDetail';
import { allFamilies, SquirrelRouteType } from '../v13/logic/SquirrelData';
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
        <Switch>
          <Route
            exact
            path="/:version/"
            render={({
              match: { url },
            }) => (
              <BeautyContainer backgroundColor='beige'>
                <Login url={url} />
              </BeautyContainer>
            )}
          />
          <Route>
            <BeautyContainer backgroundColor='yellow'>
              <Route
                path="/:version/loggedIn"
                render={({ 
                  match: { url }
                }) => (
                  <FamilyList
                    url={url}
                    squirrelFamilyNames={allFamilies.map(
                      squirrelFamily => squirrelFamily.lastName,
                    )}
                  />
                )}
              />
            </BeautyContainer>
            <BeautyContainer backgroundColor='green'>
              <Route
                path="/:version/loggedIn/:familyName"
                render={({
                  match: {
                    params: {
                      familyName,
                    },
                    url,
                  }
                }: RouteComponentProps<SquirrelRouteType>) => (
                  <SquirrelList
                    url={url}
                    squirrelIDs={allFamilies.find(
                      squirrelFamily => squirrelFamily.lastName === familyName
                    )?.members.map(
                      squirrel => squirrel.id
                    ) || []}
                  />
                )}
              />
            </BeautyContainer>
            <BeautyContainer backgroundColor='orange'>
              <Route
                path="/:version/loggedIn/:familyName/:squirrelID"
                render={({
                  match: {
                    params: {
                      familyName,
                      squirrelID,
                    },
                  }
                }: RouteComponentProps<SquirrelRouteType>) => {
                  const currentSquirrel = allFamilies.find(
                    squirrelFamily => squirrelFamily.lastName === familyName
                  )?.members.find(
                    squirrel => squirrel.id === Number.parseInt(squirrelID || '', 10)
                  );
                  return (
                    <SquirrelDetail
                      firstName={currentSquirrel?.firstName || ''}
                      favoriteColor={currentSquirrel?.favoriteColor || ''}
                    />
                  )
                }}
              >
              </Route>
            </BeautyContainer>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Landing;

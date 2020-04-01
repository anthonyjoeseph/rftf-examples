import React from 'react';
import {
  BrowserRouter as Router, Route,
  Switch, RouteComponentProps,
} from 'react-router-dom';
import FamilyList from './components/FamilyList';
import SquirrelList from './components/SquirrelList';
import SquirrelDetail from './components/SquirrelDetail';
import { allFamilies } from './logic/SquirrelData';
import Login from './components/Login';
import BeautyContainer from '../v1/components/BeautyContainer';

const appVersion = "v13";

interface SquirrelRouteType {
  version?: string;
  familyName?: string;
  squirrelID?: string;
}

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
              <Login
                appVersion={appVersion}
              />
            </BeautyContainer>
          </Route>
          <Route>
            <BeautyContainer backgroundColor='yellow'>
              <Route path="/:version/loggedIn" >
                <FamilyList
                  appVersion={appVersion}
                  squirrelFamilyNames={allFamilies.map(
                    squirrelFamily => squirrelFamily.lastName,
                  )}
                />
              </Route>
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
                    path
                  }
                }: RouteComponentProps<SquirrelRouteType>) => {
                  console.log(`url: ${url} path: ${path} `);
                  return (
                    <SquirrelList
                      appVersion={appVersion}
                      familyName={familyName || ''}
                      squirrelIDs={allFamilies.find(
                        squirrelFamily => squirrelFamily.lastName === familyName
                      )?.members.map(
                        squirrel => squirrel.id
                      ) || []}
                    />
                  );
                }}
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

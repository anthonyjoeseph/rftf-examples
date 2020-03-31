import React from 'react';
import { BrowserRouter as Router, Route, Switch, RouteComponentProps } from 'react-router-dom';
import FamilyList from './components/FamilyList';
import SquirrelList from './components/SquirrelList';
import SquirrelDetail from './components/SquirrelDetail';
import { allFamilies } from './logic/SquirrelData';
import Login from './components/Login';

const appVersion = "v10";

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
          <Route>
            <div
              style={{
                display: 'flex',
                width: 200,
                height: 300,
                backgroundColor: 'yellow',
              }}
            >
              <Route
                path="/:version/loggedIn"
              >
                <FamilyList
                  appVersion={appVersion}
                  squirrelFamilyNames={allFamilies.map(
                    squirrelFamily => squirrelFamily.lastName,
                  )}
                />
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
                path="/:version/loggedIn/:familyName"
                render={({
                  match: {
                    params: {
                      familyName,
                    },
                  }
                }: RouteComponentProps<SquirrelRouteType>) => (
                  <SquirrelList
                    appVersion={appVersion}
                    familyName={familyName || ''}
                    squirrelIDs={allFamilies.find(
                      squirrelFamily => squirrelFamily.lastName === familyName
                    )?.members.map(
                      squirrel => squirrel.id
                    ) || []}
                  />
                )}
              />
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
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Landing;

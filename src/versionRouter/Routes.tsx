import React from 'react';
import * as E from 'fp-ts/lib/Either';
import { withNarrowerAppState } from 'react-fp-ts-router';
import { AppState, L, R } from './AppState';

const HasVersion = withNarrowerAppState(
  ({ appState }: { appState: AppState & R }) => (
    <appState.Version.right />
  ),
  (a: AppState): a is AppState & R => E.isRight(a.Version),
);

const NoVersion = withNarrowerAppState(
  ({ appState }: { appState: AppState & L }) => (
    <div>
      Version does not exist: {appState.Version.left}
    </div>
  ),
  (a: AppState): a is AppState & L => E.isLeft(a.Version),
);

export const Root = ({ appState }: { appState: AppState }): JSX.Element => (
  <>
    <HasVersion 
      appState={appState}
    />
    <NoVersion
      appState={appState}
    />
  </>
);
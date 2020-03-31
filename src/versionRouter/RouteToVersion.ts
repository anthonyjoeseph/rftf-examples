import * as E from 'fp-ts/lib/Either';
import { withCallbackRoutes } from 'react-fp-ts-router';
import { AppRoute, appRouter, routeToState } from './Versions';
import { Root } from './Routes';
import { AppState } from './AppState';

const RouteToVersion = withCallbackRoutes<AppState, AppRoute>(
  Root,
  appRouter,
  AppRoute.Other({ incorrectVersion: '' }),
  () => ({ Version: E.left('') }),
  routeToState,
);

export default RouteToVersion;
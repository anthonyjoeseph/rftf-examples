import * as E from 'fp-ts/lib/Either';
import { withCallbackRoutes } from 'react-fp-ts-router';
import { AppRoute, appRouter, routeToState } from './logic/Routes';
import { Root } from './Routes';
import { AppState } from './logic/AppState';

const RouteToVersion = withCallbackRoutes<AppState, AppRoute>(
  Root,
  appRouter,
  AppRoute.OTHER({ nonExistentVersion: '' }),
  () => ({ Version: E.left('') }),
  routeToState,
);

export default RouteToVersion;
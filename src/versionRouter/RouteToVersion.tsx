import * as E from 'fp-ts/lib/Either';
import React from 'react';
import {
  withInterceptingRouter,
  InterceptRouteResponse,
  InterceptingRouterProps,
} from 'react-fp-ts-router';
import { parser, formatter } from './logic/Routes';
import * as AR from './logic/AppRoute';

type Interceptable = E.Either<string, React.ComponentType<{}>>;

const RouteToVersion = withInterceptingRouter<AR.AppRoute, Interceptable>(
  ({
    interceptable,
  }: InterceptingRouterProps<AR.AppRoute, Interceptable>): JSX.Element => E.fold(
    (badVersion: string) => (
      <div>
        Version does not exist: {badVersion}
      </div>
    ),
    (Version: React.ComponentType<{}>) => (
      <Version />
    ),
  )(interceptable),
  parser,
  formatter,
  AR.other(''),
  E.left(''),
  (
    route: AR.AppRoute,
  ): InterceptRouteResponse<AR.AppRoute, Interceptable> => {
    return AR.fold({
      onversion: (component) => ({
        sync: {
          interceptable: E.right(component),
        }
      }),
      onother: (nonExistentVersion) => ({
        sync: {
          interceptable: E.left<string, React.ComponentType<{}>>(nonExistentVersion),
        }
      }),
    })(route);
  },
);

export default RouteToVersion;

import * as T from 'fp-ts/lib/Task';
import * as E from 'fp-ts/lib/Either';
import { StateTaskFromRoute } from 'react-fp-ts-router';
import * as R from "fp-ts-routing";
import { unionize, UnionOf, ofType } from "unionize";
import { AppState } from './AppState';
import V1 from '../reactRouter/v1/components/Landing';
import V2 from '../reactRouter/v2/Landing';

export const AppRoute = unionize({
  V1: {},
  V2: {},
  Other: ofType<{ incorrectVersion: string }>(),
});
export type AppRoute = UnionOf<typeof AppRoute>;

export const appRouter = R.zero<AppRoute>()
  .alt(R.lit('v1').parser.map(() => AppRoute.V1()))
  .alt(R.lit('v2').parser.map(() => AppRoute.V2()))
  .alt(
    R.str('incorrectVersion').parser
      .map(({ incorrectVersion }) => AppRoute.Other({ incorrectVersion })),
  );

export const routeToState: StateTaskFromRoute<AppState, AppRoute> = () => AppRoute.match({
  V1: () => T.of({ appState: { Version: E.right(V1) } }),
  V2: () => T.of({ appState: { Version: E.right(V2) } }),
  Other: ({ incorrectVersion }) => T.of({
    appState: { Version: E.left<string, () => JSX.Element>(incorrectVersion) },
  }),
});


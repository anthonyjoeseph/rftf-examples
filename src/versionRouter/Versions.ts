import * as T from 'fp-ts/lib/Task';
import * as E from 'fp-ts/lib/Either';
import { StateTaskFromRoute } from 'react-fp-ts-router';
import * as R from "fp-ts-routing";
import { unionize, UnionOf, ofType } from "unionize";
import { AppState } from './AppState';
import V1 from '../reactRouter/v1/Landing';
import V2 from '../reactRouter/v2/Landing';
import V3 from '../reactRouter/v3/Landing';
import V4 from '../reactRouter/v4/Landing';
import V5 from '../reactRouter/v5/Landing';
import V6 from '../reactRouter/v6/Landing';
import V7 from '../reactRouter/v7/Landing';
import V8 from '../reactRouter/v8/Landing';
import V9 from '../reactRouter/v8/Landing';

export const AppRoute = unionize({
  V1: {},
  V2: {},
  V3: {},
  V4: {},
  V5: {},
  V6: {},
  V7: {},
  V8: {},
  V9: {},
  Other: ofType<{ incorrectVersion: string }>(),
});
export type AppRoute = UnionOf<typeof AppRoute>;

export const appRouter = R.zero<AppRoute>()
  .alt(R.lit('v1').parser.map(() => AppRoute.V1()))
  .alt(R.lit('v2').parser.map(() => AppRoute.V2()))
  .alt(R.lit('v3').parser.map(() => AppRoute.V3()))
  .alt(R.lit('v4').parser.map(() => AppRoute.V4()))
  .alt(R.lit('v5').parser.map(() => AppRoute.V5()))
  .alt(R.lit('v6').parser.map(() => AppRoute.V6()))
  .alt(R.lit('v7').parser.map(() => AppRoute.V7()))
  .alt(R.lit('v8').parser.map(() => AppRoute.V8()))
  .alt(R.lit('v9').parser.map(() => AppRoute.V9()))
  .alt(
    R.str('incorrectVersion').parser
      .map(({ incorrectVersion }) => AppRoute.Other({ incorrectVersion })),
  );

export const routeToState: StateTaskFromRoute<AppState, AppRoute> = () => AppRoute.match({
  V1: () => T.of({ appState: { Version: E.right(V1) } }),
  V2: () => T.of({ appState: { Version: E.right(V2) } }),
  V3: () => T.of({ appState: { Version: E.right(V3) } }),
  V4: () => T.of({ appState: { Version: E.right(V4) } }),
  V5: () => T.of({ appState: { Version: E.right(V5) } }),
  V6: () => T.of({ appState: { Version: E.right(V6) } }),
  V7: () => T.of({ appState: { Version: E.right(V7) } }),
  V8: () => T.of({ appState: { Version: E.right(V8) } }),
  V9: () => T.of({ appState: { Version: E.right(V9) } }),
  Other: ({ incorrectVersion }) => T.of({
    appState: { Version: E.left<string, () => JSX.Element>(incorrectVersion) },
  }),
});


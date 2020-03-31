import * as T from 'fp-ts/lib/Task';
import * as A from 'fp-ts/lib/Array';
import * as E from 'fp-ts/lib/Either';
import * as RE from 'fp-ts/lib/Record';
import { StateTaskFromRoute } from 'react-fp-ts-router';
import * as R from "fp-ts-routing";
import { unionize, UnionOf, ofType } from "unionize";
import { AppState } from './AppState';
import { literalToComponent } from './LiteralToComponent';

export const AppRoute = unionize({
  VERSION: ofType<{ component: React.ComponentType<{}> }>(),
  OTHER: ofType<{ nonExistentVersion: string }>(),
});
export type AppRoute = UnionOf<typeof AppRoute>;

const appComponentRouter: R.Parser<AppRoute> = A.array.reduce(
  RE.toArray(
    literalToComponent
  ).map(
    ([lit, component]) => R.lit(lit).parser.map(() => AppRoute.VERSION({ component }))
  ),
  R.zero<AppRoute>(),
  (parser, nextParser) => parser.alt(nextParser),
);

export const appRouter: R.Parser<AppRoute> = appComponentRouter.alt(
  R.str('nonExistentVersion').parser
    .map(({ nonExistentVersion }) => AppRoute.OTHER({ nonExistentVersion })),
);

export const routeToState: StateTaskFromRoute<AppState, AppRoute> = () => AppRoute.match({
  VERSION: ({ component }) => T.of({ appState: {
    Version: E.right<string, React.ComponentType<{}>>(component),
  } }),
  OTHER: ({ nonExistentVersion }) => T.of({
    appState: { Version: E.left<string, React.ComponentType<{}>>(nonExistentVersion) },
  })
});

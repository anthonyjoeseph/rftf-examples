import * as RE from 'fp-ts/lib/Record';
import * as M from 'fp-ts/lib/Monoid';
import * as R from "fp-ts-routing";
import { literalToComponent } from './LiteralToComponent';
import * as AR from './AppRoute';

export const parser: R.Parser<AR.AppRoute> = M.fold(
  R.getParserMonoid<AR.AppRoute>(),
)(
  RE.toArray(literalToComponent)
    .map(
      ([lit, component]) => R.lit(lit)
        .parser.map(() => AR.version(component))
    ),
).alt(
  R.str('nonExistentVersion').parser
    .map(({ nonExistentVersion }) => AR.other(nonExistentVersion)),
);

export const formatter: (r: AR.AppRoute) => string = AR.fold({
  onother: (other) => `/${other}`,
  onversion: () => '/v0',
});

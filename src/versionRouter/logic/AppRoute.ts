import { Prism } from "monocle-ts";
import { Eq, fromEquals } from "fp-ts/lib/Eq";

/**
 * data AppRoute = version React.ComponentType | other string
 */

export type AppRoute = {
  readonly type: "version";
  readonly value0: React.ComponentType;
} | {
  readonly type: "other";
  readonly value0: string;
};

export function version(value0: React.ComponentType): AppRoute { return { type: "version", value0 }; }

export function other(value0: string): AppRoute { return { type: "other", value0 }; }

export function fold<R>(handlers: {
  onversion: (value0: React.ComponentType) => R;
  onother: (value0: string) => R;
}): (fa: AppRoute) => R { return fa => { switch (fa.type) {
  case "version": return handlers.onversion(fa.value0);
  case "other": return handlers.onother(fa.value0);
} }; }

export const _version: Prism<AppRoute, AppRoute> = Prism.fromPredicate(s => s.type === "version");

export const _other: Prism<AppRoute, AppRoute> = Prism.fromPredicate(s => s.type === "other");

export function getEq(eqversionValue0: Eq<React.ComponentType>, eqotherValue0: Eq<string>): Eq<AppRoute> { return fromEquals((x, y) => { if (x.type === "version" && y.type === "version") {
  return eqversionValue0.equals(x.value0, y.value0);
} if (x.type === "other" && y.type === "other") {
  return eqotherValue0.equals(x.value0, y.value0);
} return false; }); }
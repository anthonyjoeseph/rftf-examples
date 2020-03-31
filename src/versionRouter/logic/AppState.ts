import React from 'react';
import * as E from 'fp-ts/lib/Either';

export interface AppState {
  Version: E.Either<string, React.ComponentType<{}>>
}

export interface R {
  Version: E.Right<React.ComponentType<{}>>
}
export interface L {
  Version: E.Left<string>
}
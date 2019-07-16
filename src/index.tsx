import 'bootstrap';
import React from 'react';
import { render } from 'react-dom';

import { UserAction } from './common/services/user';
import { SpinnerActions } from './packages/spinner/ducks';

import 'app/styles/main.css';

import Root from 'app/Root';

type RootAction = UserAction | SpinnerActions; // TODO add router actions

// TODO can be in some 'types.d.ts' & react-app-env.d.ts doesn't work, keeping here now
declare module 'typesafe-actions' {
  interface Types {
    RootAction: RootAction;
  }
}

render(<Root />, document.getElementById('root'));

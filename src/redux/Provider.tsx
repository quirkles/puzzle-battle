'use client';
import * as React from 'react';
/* Core */
import { Provider } from 'react-redux';
import { reduxStore } from './store';

/* Instruments */

export const ReduxProviders = (props: React.PropsWithChildren) => {
  return <Provider store={reduxStore}>{props.children}</Provider>;
};

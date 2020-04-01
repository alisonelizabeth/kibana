/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { ChromeBreadcrumb, CoreStart } from 'src/core/public';
import { KibanaContextProvider } from '../../../../../src/plugins/kibana_react/public';

import { App } from './app';

export const renderApp = (
  core: CoreStart,
  {
    element,
    setBreadcrumbs,
  }: {
    element: HTMLElement;
    setBreadcrumbs: (crumbs: ChromeBreadcrumb[]) => void;
  }
) => {
  const {
    i18n: { Context: I18nContext },
  } = core;

  render(
    <I18nContext>
      <KibanaContextProvider
        services={{
          setBreadcrumbs,
        }}
      >
        <App />
      </KibanaContextProvider>
    </I18nContext>,
    element
  );

  return () => {
    unmountComponentAtNode(element);
  };
};

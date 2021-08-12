/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { I18nStart, ScopedHistory } from 'src/core/public';
import { GlobalFlyout } from '../shared_imports';
import { AppContextProvider, ContextValue, useAppContext } from './app_context';
import { ComingSoonPrompt } from './components/coming_soon_prompt';
import { EsDeprecationsContent } from './components/es_deprecations';
import { KibanaDeprecationsContent } from './components/kibana_deprecations';
import { DeprecationsOverview } from './components/overview';

const { GlobalFlyoutProvider } = GlobalFlyout;
export interface AppDependencies extends ContextValue {
  i18n: I18nStart;
  history: ScopedHistory;
}

const App: React.FunctionComponent = () => {
  const { isReadOnlyMode } = useAppContext();

  // Read-only mode will be enabled up until the last minor before the next major release
  if (isReadOnlyMode) {
    return <ComingSoonPrompt />;
  }

  return (
    <Switch>
      <Route exact path="/overview" component={DeprecationsOverview} />
      <Route exact path="/es_deprecations" component={EsDeprecationsContent} />
      <Route exact path="/kibana_deprecations" component={KibanaDeprecationsContent} />
      <Redirect from="/" to="/overview" />
    </Switch>
  );
};

export const AppWithRouter = ({ history }: { history: ScopedHistory }) => {
  return (
    <Router history={history}>
      <App />
    </Router>
  );
};

export const RootComponent = ({ i18n, history, ...contextValue }: AppDependencies) => {
  return (
    <i18n.Context>
      <AppContextProvider value={contextValue}>
        <GlobalFlyoutProvider>
          <AppWithRouter history={history} />
        </GlobalFlyoutProvider>
      </AppContextProvider>
    </i18n.Context>
  );
};

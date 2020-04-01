/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React, { createContext, useContext } from 'react';
import { CoreStart } from 'src/core/public';
import { HttpService } from './services';

const AppContext = createContext<AppDependencies | undefined>(undefined);

export interface AppDependencies {
  core: CoreStart;
  services: {
    httpService: HttpService;
  };
}

export const AppContextProvider = ({
  children,
  context,
}: {
  context: AppDependencies;
  children: React.ReactNode;
}) => {
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export const AppContextConsumer = AppContext.Consumer;

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('"useAppContext" can only be called inside of AppContext.Provider!');
  }
  return ctx;
};

export const useServices = () => useAppContext().services;

export const useCore = () => useAppContext().core;

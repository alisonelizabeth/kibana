/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React, { createContext, useContext } from 'react';
import { useEuiTour } from '@elastic/eui';

const demoTourSteps = [
  {
    step: 1,
    title: 'Add documents',
    anchorPosition: 'upCenter',
  },
  {
    step: 2,
    title: 'Documents',
    anchorPosition: 'upCenter',
  },
  {
    step: 3,
    title: 'Processor status',
    anchorPosition: 'downRight',
  },
  {
    step: 4,
    title: 'Processor details',
    anchorPosition: 'downLeft',
  },
];

const tourConfig = {
  currentTourStep: 1,
  isTourActive: true,
  tourPopoverWidth: true,
  tourSubtitle: 'Test pipeline tour',
};

const TourContext = createContext(undefined);

export const TourProvider = ({ children }: { children: React.ReactNode }) => {
  const [tourSteps, actions, reducerState] = useEuiTour(demoTourSteps, tourConfig);

  return (
    <TourContext.Provider
      value={{
        tourSteps,
        tourActions: actions,
        tourState: reducerState,
      }}
    >
      {children}
    </TourContext.Provider>
  );
};

export const TourContextConsumer = TourContext.Consumer;

export const useTourContext = () => {
  const ctx = useContext(TourContext);
  if (!ctx) {
    throw new Error('"useTourContext" can only be called inside of TourContext.Provider!');
  }
  return ctx;
};

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React, { useState, useCallback, useContext } from 'react';

export interface TestPipelineData {
  documents?: object[];
  results?: any; // todo fix TS
  resultsByProcessor?: any; // todo fix TS
}

interface TestPipelineContext {
  testPipelineData: TestPipelineData;
  setTestPipelineData: (data: TestPipelineData) => void;
}

const DEFAULT_TEST_PIPELINE_DATA = {
  testPipelineData: {},
  setCurrentTestPipelineData: () => {},
};

const TestPipelineContext = React.createContext<TestPipelineData>(DEFAULT_TEST_PIPELINE_DATA);

export const useTestPipelineContext = () => {
  const ctx = useContext(TestPipelineContext);
  if (!ctx) {
    throw new Error(
      '"useTestPipelineContext" can only be called inside of TestPipelineContextProvider.Provider!'
    );
  }
  return ctx;
};

export const TestPipelineContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [testPipelineData, setTestPipelineData] = useState<TestPipelineData>({});

  const setCurrentTestPipelineData = useCallback(
    (currentTestPipelineData: TestPipelineData): void => {
      setTestPipelineData(currentTestPipelineData);
    },
    []
  );

  return (
    <TestPipelineContext.Provider
      value={{
        testPipelineData,
        setCurrentTestPipelineData,
      }}
    >
      {children}
    </TestPipelineContext.Provider>
  );
};

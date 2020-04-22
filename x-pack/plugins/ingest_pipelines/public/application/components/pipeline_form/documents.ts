/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';

export interface DocumentContext {
  // TODO rename this to simulateCache or something like that
  documents: {
    documents: object[] | undefined;
  };
  setCurrentDocuments: (documents: object[] | undefined) => void;
  // verbose?: boolean;
}

export const DOCUMENT_DEFAULT_VALUE = {
  documents: {
    documents: undefined,
  },
  setCurrentDocuments: () => {},
  // verbose: false,
};

export const documentContext = React.createContext<DocumentContext>(DOCUMENT_DEFAULT_VALUE);

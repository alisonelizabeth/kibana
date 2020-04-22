/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { useState, useCallback } from 'react';
import { DocumentContext } from './documents';

export const useDocuments = () => {
  const [documents, setDocuments] = useState(undefined);

  const setCurrentDocuments = useCallback((currentDocuments: DocumentContext): void => {
    setDocuments(currentDocuments);
  }, []);

  return {
    documents,
    setCurrentDocuments,
  };
};

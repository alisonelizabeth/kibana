/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import React from 'react';

import { ESDeprecationsTab } from '../../components';

interface Props {
  deprecations: any;
  label: string;
  showBackupWarning?: boolean;
  passThroughProps: object;
}

export const IndexDeprecationsTab: React.FunctionComponent<Props> = ({
  deprecations,
  label,
  passThroughProps,
}) => (
  <ESDeprecationsTab
    key="indices"
    deprecations={deprecations}
    checkupLabel={label}
    showBackupWarning
    {...passThroughProps}
  />
);

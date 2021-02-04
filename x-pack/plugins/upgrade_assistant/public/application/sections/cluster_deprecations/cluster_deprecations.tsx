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

export const ClusterDeprecationsTab: React.FunctionComponent<Props> = () => (
  <ESDeprecationsTab
    key="cluster"
    deprecations={checkupData ? checkupData.cluster : undefined}
    checkupLabel={i18n.translate('xpack.upgradeAssistant.tabs.checkupTab.clusterLabel', {
      defaultMessage: 'cluster',
    })}
    {...commonProps}
  />
);

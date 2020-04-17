/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';
import { FormattedMessage } from '@kbn/i18n/react';
import { EuiTab, EuiTabs } from '@elastic/eui';

interface Props {
  onTabChange: (tab: 'build' | 'debug') => void;
  selectedTab: 'build' | 'debug';
}

export const Tabs: React.FunctionComponent<Props> = ({ onTabChange, selectedTab }) => {
  const tabs: Array<{
    id: 'build' | 'debug';
    name: React.ReactNode;
  }> = [
    {
      id: 'build',
      name: (
        <FormattedMessage id="xpack.ingestPipelines.tabs.buildTabTitle" defaultMessage="Build" />
      ),
    },
    {
      id: 'debug',
      name: (
        <FormattedMessage id="xpack.ingestPipelines.tabs.debugTabTitle" defaultMessage="Debug" />
      ),
    },
  ];

  return (
    <EuiTabs>
      {tabs.map(tab => (
        <EuiTab
          onClick={() => onTabChange(tab.id)}
          isSelected={tab.id === selectedTab}
          key={tab.id}
          data-test-subj={tab.id.toLowerCase() + '_tab'}
        >
          {tab.name}
        </EuiTab>
      ))}
    </EuiTabs>
  );
};

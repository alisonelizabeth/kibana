/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';

import { EuiFilterButton, EuiFilterGroup, EuiFlexItem } from '@elastic/eui';
import { i18n } from '@kbn/i18n';

import { LevelFilterOption } from '../../types';

const LocalizedOptions: { [option: string]: string } = {
  all: i18n.translate('xpack.upgradeAssistant.checkupTab.controls.filterBar.allButtonLabel', {
    defaultMessage: 'all',
  }),
  critical: i18n.translate(
    'xpack.upgradeAssistant.checkupTab.controls.filterBar.criticalButtonLabel',
    { defaultMessage: 'critical' }
  ),
};

const allFilterOptions = Object.keys(LevelFilterOption) as LevelFilterOption[];

interface DeprecationLevelProps {
  totalDeprecationsCount: number;
  levelsCount: {
    [key: string]: number;
  };
  currentFilter: LevelFilterOption;
  onFilterChange(level: LevelFilterOption): void;
}

export const DeprecationLevelFilter: React.FunctionComponent<DeprecationLevelProps> = ({
  totalDeprecationsCount,
  levelsCount,
  currentFilter,
  onFilterChange,
}) => {
  return (
    <EuiFlexItem grow={false}>
      <EuiFilterGroup>
        {allFilterOptions.map((option) => (
          <EuiFilterButton
            key={option}
            onClick={onFilterChange.bind(null, option)}
            hasActiveFilters={currentFilter === option}
            numFilters={
              option === LevelFilterOption.all
                ? totalDeprecationsCount
                : levelsCount[option] || undefined
            }
          >
            {LocalizedOptions[option]}
          </EuiFilterButton>
        ))}
      </EuiFilterGroup>
    </EuiFlexItem>
  );
};

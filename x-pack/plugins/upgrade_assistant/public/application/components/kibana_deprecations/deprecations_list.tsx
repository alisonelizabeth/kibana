/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { find } from 'lodash';
import React, { FunctionComponent, useState } from 'react';
import { i18n } from '@kbn/i18n';

import { EuiSpacer } from '@elastic/eui';

import { GroupByOption, LevelFilterOption, UpgradeAssistantTabProps } from '../types';
import { NoDeprecationsPrompt } from '../shared';
import { CheckupControls } from '../es_deprecations/controls';
import { SectionLoading } from '../../../shared_imports';

export interface CheckupTabProps extends UpgradeAssistantTabProps {
  checkupLabel: string;
}

const i18nTexts = {
  isLoading: i18n.translate('xpack.upgradeAssistant.kibanaDeprecations.loadingText', {
    defaultMessage: 'Loading deprecations…',
  }),
};

/**
 * Displays a list of deprecations that filterable and groupable. Can be used for cluster,
 * nodes, or indices checkups.
 */
export const KibanaDeprecationsList: FunctionComponent<CheckupTabProps> = ({
  checkupLabel,
  deprecations,
  error,
  isLoading,
  refreshCheckupData,
  navigateToOverviewPage,
}) => {
  const [currentFilter, setCurrentFilter] = useState<LevelFilterOption>(LevelFilterOption.all);
  const [search, setSearch] = useState<string>('');
  const [currentGroupBy, setCurrentGroupBy] = useState<GroupByOption>(GroupByOption.message);

  const changeFilter = (filter: LevelFilterOption) => {
    setCurrentFilter(filter);
  };

  const changeSearch = (newSearch: string) => {
    setSearch(newSearch);
  };

  const changeGroupBy = (groupBy: GroupByOption) => {
    setCurrentGroupBy(groupBy);
  };

  const availableGroupByOptions = () => {
    if (!deprecations) {
      return [];
    }

    return Object.keys(GroupByOption).filter((opt) => find(deprecations, opt)) as GroupByOption[];
  };

  if (deprecations && deprecations.length === 0) {
    return (
      <NoDeprecationsPrompt
        deprecationType={checkupLabel}
        navigateToOverviewPage={navigateToOverviewPage}
      />
    );
  }

  let content: React.ReactNode;

  if (isLoading) {
    content = <SectionLoading>{i18nTexts.isLoading}</SectionLoading>;
  } else if (deprecations?.length) {
    content = (
      <div data-test-subj="deprecationsContainer">
        <CheckupControls
          allDeprecations={deprecations}
          isLoading={isLoading}
          loadData={() => {}} // TODO implement
          currentFilter={currentFilter}
          onFilterChange={changeFilter}
          onSearchChange={changeSearch}
        />

        <EuiSpacer />

        {/* <GroupedDeprecations
          currentGroupBy={currentGroupBy}
          currentFilter={currentFilter}
          search={search}
          allDeprecations={deprecations}
        /> */}
      </div>
    );
  } else if (error) {
    content = <div>TODO handle error</div>;
  }
  return (
    <div data-test-subj="kibanaDeprecationsContent">
      <EuiSpacer />
      {content}
    </div>
  );
};

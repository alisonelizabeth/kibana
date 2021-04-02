/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { find, groupBy } from 'lodash';
import React, { FunctionComponent, useState } from 'react';
import { i18n } from '@kbn/i18n';

import { EuiSpacer } from '@elastic/eui';

import { EnrichedDeprecationInfo } from '../../../../common/types';
import { SectionLoading } from '../../../shared_imports';
import { GroupByOption, LevelFilterOption, UpgradeAssistantTabProps } from '../types';
import {
  NoDeprecationsPrompt,
  SearchBar,
  DeprecationPagination,
  DeprecationListBar,
} from '../shared';
import { EsDeprecationErrors } from './es_deprecation_errors';
import { EsDeprecationAccordion } from './deprecations/group_item';

const i18nTexts = {
  isLoading: i18n.translate('xpack.upgradeAssistant.esDeprecations.loadingText', {
    defaultMessage: 'Loading deprecations…',
  }),
};

export interface CheckupTabProps extends UpgradeAssistantTabProps {
  checkupLabel: string;
}

const PER_PAGE = 25;

export const filterDeps = (level: LevelFilterOption, search: string = '') => {
  const conditions: Array<(dep: EnrichedDeprecationInfo) => boolean> = [];

  if (level !== LevelFilterOption.all) {
    conditions.push((dep: EnrichedDeprecationInfo) => dep.level === level);
  }

  if (search.length > 0) {
    // Change everything to lower case for a case-insensitive comparison
    conditions.push((dep) => {
      try {
        const searchReg = new RegExp(search.toLowerCase());
        return Boolean(dep.message.toLowerCase().match(searchReg));
      } catch (e) {
        // ignore any regexp errors.
        return true;
      }
    });
  }

  // Return true if every condition function returns true (boolean AND)
  return (dep: EnrichedDeprecationInfo) => conditions.map((c) => c(dep)).every((t) => t);
};

/**
 * Collection of calculated fields based on props, extracted for reuse in
 * `render` and `getDerivedStateFromProps`.
 */
const CalcFields = {
  filteredDeprecations(props: {
    deprecations: EnrichedDeprecationInfo[];
    currentFilter: LevelFilterOption;
    search: string;
  }) {
    const { deprecations = [], currentFilter, search } = props;
    return deprecations.filter(filterDeps(currentFilter, search));
  },

  groups(props: {
    deprecations: EnrichedDeprecationInfo[];
    currentFilter: LevelFilterOption;
    search: string;
  }) {
    return groupBy(CalcFields.filteredDeprecations(props), GroupByOption.message);
  },

  numPages(props: {
    deprecations: EnrichedDeprecationInfo[];
    currentFilter: LevelFilterOption;
    search: string;
  }) {
    return Math.ceil(Object.keys(CalcFields.groups(props)).length / PER_PAGE);
  },
};

/**
 * Displays a list of deprecations that filterable and groupable. Can be used for cluster,
 * nodes, or indices checkups.
 */
export const DeprecationTabContent: FunctionComponent<CheckupTabProps> = ({
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
  const [expandState, setExpandState] = useState({
    forceExpand: false,
    expandNumber: 0,
  });
  const [currentPage, setCurrentPage] = useState(0);

  const changeFilter = (filter: LevelFilterOption) => {
    setCurrentFilter(filter);
  };

  const changeSearch = (newSearch: string) => {
    setSearch(newSearch);
  };

  const changeGroupBy = (groupByOption: GroupByOption) => {
    setCurrentGroupBy(groupByOption);
  };

  const setExpandAll = (expandAll: boolean) => {
    setExpandState({ forceExpand: expandAll, expandNumber: expandState.expandNumber + 1 });
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
    const levelGroups = groupBy(deprecations, 'level');
    const deprecationLevelsCount = Object.keys(levelGroups).reduce((counts, level) => {
      counts[level] = levelGroups[level].length;
      return counts;
    }, {} as { [level: string]: number });

    const filteredDeprecations = CalcFields.filteredDeprecations({
      deprecations,
      currentFilter,
      search,
    });

    const groups = CalcFields.groups({
      deprecations,
      currentFilter,
      search,
    });

    content = (
      <div data-test-subj="deprecationsContainer">
        <SearchBar
          allDeprecations={deprecations}
          isLoading={isLoading}
          loadData={refreshCheckupData}
          currentFilter={currentFilter}
          onFilterChange={changeFilter}
          onSearchChange={changeSearch}
          totalDeprecationsCount={deprecations.length}
          deprecationLevelsCount={deprecationLevelsCount}
          groupByFilterProps={{
            availableGroupByOptions: availableGroupByOptions(),
            currentGroupBy,
            onGroupByChange: changeGroupBy,
          }}
        />
        <EuiSpacer />

        <DeprecationListBar
          allDeprecationsCount={deprecations.length}
          filteredDeprecationsCount={filteredDeprecations.length}
          setExpandAll={setExpandAll}
        />
        <EuiSpacer size="s" />

        <div className="upgDeprecations">
          {Object.keys(groups)
            .sort()
            // Apply pagination
            .slice(currentPage * PER_PAGE, (currentPage + 1) * PER_PAGE)
            .map((groupName) => [
              <EsDeprecationAccordion
                {...{
                  key: expandState.expandNumber,
                  id: `depgroup-${groupName}`,
                  dataTestSubj: `depgroup_${groupName.split(' ').join('_')}`,
                  title: groupName,
                  deprecations: groups[groupName],
                  currentGroupBy,
                  forceExpand: expandState.forceExpand,
                }}
              />,
            ])}

          {/* Only show pagination if we have more than PER_PAGE. */}
          {Object.keys(groups).length > PER_PAGE && (
            <>
              <EuiSpacer />

              <DeprecationPagination
                pageCount={CalcFields.numPages({
                  deprecations,
                  currentFilter,
                  search,
                })}
                activePage={currentPage}
                setPage={setCurrentPage}
              />
            </>
          )}
        </div>
      </div>
    );
  } else if (error) {
    content = <EsDeprecationErrors error={error} />;
  }

  return (
    <div data-test-subj={`${checkupLabel}TabContent`}>
      <EuiSpacer />

      {content}
    </div>
  );
};

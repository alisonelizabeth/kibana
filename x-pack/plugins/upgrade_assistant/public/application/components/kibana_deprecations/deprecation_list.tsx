/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { FunctionComponent, useState } from 'react';

import { EuiSpacer } from '@elastic/eui';

// eslint-disable-next-line @kbn/eslint/no-restricted-paths
import { DomainDeprecationDetails } from 'src/core/server/types';
import { groupBy } from 'lodash';
import { GroupByOption, LevelFilterOption } from '../types';
import { SearchBar, DeprecationListBar, DeprecationPagination } from '../shared';
import { KibanaDeprecationAccordion } from './deprecation_group_item';

interface Props {
  deprecations: DomainDeprecationDetails[];
}

const PER_PAGE = 25;

export const filterDeps = (level: LevelFilterOption, search: string = '') => {
  const conditions: Array<(dep: DomainDeprecationDetails) => boolean> = [];

  if (level !== LevelFilterOption.all) {
    conditions.push((dep: DomainDeprecationDetails) => dep.level === level);
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
  return (dep: DomainDeprecationDetails) => conditions.map((c) => c(dep)).every((t) => t);
};

/**
 * Collection of calculated fields based on props, extracted for reuse in
 * `render` and `getDerivedStateFromProps`.
 */
const CalcFields = {
  filteredDeprecations(props: {
    deprecations: DomainDeprecationDetails[];
    currentFilter: LevelFilterOption;
    search: string;
  }) {
    const { deprecations = [], currentFilter, search } = props;
    return deprecations.filter(filterDeps(currentFilter, search));
  },

  groups(props: {
    deprecations: DomainDeprecationDetails[];
    currentFilter: LevelFilterOption;
    search: string;
  }) {
    return groupBy(CalcFields.filteredDeprecations(props), GroupByOption.message);
  },

  numPages(props: {
    deprecations: DomainDeprecationDetails[];
    currentFilter: LevelFilterOption;
    search: string;
  }) {
    return Math.ceil(Object.keys(CalcFields.groups(props)).length / PER_PAGE);
  },
};

// TODO test pagination
//   public static getDerivedStateFromProps(
//     nextProps: GroupedDeprecationsProps,
//     { currentPage }: GroupedDeprecationsState
//   ) {
//   // If filters change and the currentPage is now bigger than the num of pages we're going to show,
//   // reset the current page to 0.
//   if (currentPage >= CalcFields.numPages(nextProps)) {
//     return { currentPage: 0 };
//   } else {
//     return null;
//   }
// }

export const KibanaDeprecationList: FunctionComponent<Props> = ({ deprecations }) => {
  const [currentFilter, setCurrentFilter] = useState<LevelFilterOption>(LevelFilterOption.all);
  const [search, setSearch] = useState('');
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

  const setExpandAll = (expandAll: boolean) => {
    setExpandState({ forceExpand: expandAll, expandNumber: expandState.expandNumber + 1 });
  };

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

  return (
    <div data-test-subj="deprecationsContainer">
      <SearchBar
        isLoading={false} // TODO used for refresh
        loadData={() => {}} // TODO implement
        currentFilter={currentFilter}
        onFilterChange={changeFilter}
        onSearchChange={changeSearch}
        totalDeprecationsCount={deprecations.length}
        deprecationLevelsCount={deprecationLevelsCount}
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
            <KibanaDeprecationAccordion
              {...{
                key: expandState.expandNumber,
                id: `depgroup-${groupName}`,
                dataTestSubj: `depgroup_${groupName.split(' ').join('_')}`,
                title: groupName,
                deprecations: groups[groupName],
                currentGroupBy: GroupByOption.message,
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
};

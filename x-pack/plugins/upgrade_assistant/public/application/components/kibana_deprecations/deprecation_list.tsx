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
import { LevelFilterOption } from '../types';
import { SearchBar, DeprecationListBar, DeprecationPagination } from '../shared';
import { KibanaDeprecationAccordion } from './deprecation_group_item';
import { LEVEL_MAP, DEPRECATIONS_PER_PAGE } from '../constants';

interface Props {
  deprecations: DomainDeprecationDetails[];
}

const getFilteredDeprecations = (
  deprecations: DomainDeprecationDetails[],
  level: string,
  search: string
) => {
  return deprecations
    .filter((deprecation) => {
      return level === 'all' ? true : deprecation.level === level;
    })
    .filter((filteredDep) => {
      if (search.length > 0) {
        try {
          const searchReg = new RegExp(search.toLowerCase());
          return Boolean(filteredDep.message.toLowerCase().match(searchReg));
        } catch (e) {
          // ignore any regexp errors
          return true;
        }
      }
      return true;
    });
};

const sortByLevelDesc = (a: DomainDeprecationDetails, b: DomainDeprecationDetails) => {
  return -1 * (LEVEL_MAP[a.level] - LEVEL_MAP[b.level]);
};

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

  const filteredDeprecations = getFilteredDeprecations(deprecations, currentFilter, search);

  // TODO reset the page count if total needed page count is less than current
  // setCurrentPage(0);

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
        {filteredDeprecations
          .slice(currentPage * DEPRECATIONS_PER_PAGE, (currentPage + 1) * DEPRECATIONS_PER_PAGE)
          .sort(sortByLevelDesc)
          .map((deprecation, index) => [
            <KibanaDeprecationAccordion
              {...{
                key: expandState.expandNumber,
                index,
                deprecation,
                forceExpand: expandState.forceExpand,
              }}
            />,
          ])}

        {/* Only show pagination if we have more than DEPRECATIONS_PER_PAGE */}
        {filteredDeprecations.length > DEPRECATIONS_PER_PAGE && (
          <>
            <EuiSpacer />

            <DeprecationPagination
              pageCount={Math.ceil(filteredDeprecations.length / DEPRECATIONS_PER_PAGE)}
              activePage={currentPage}
              setPage={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

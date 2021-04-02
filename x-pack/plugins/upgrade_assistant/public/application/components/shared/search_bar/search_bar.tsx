/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { FunctionComponent, useState } from 'react';
import { i18n } from '@kbn/i18n';
import { EuiButton, EuiFieldSearch, EuiFlexGroup, EuiFlexItem, EuiCallOut } from '@elastic/eui';
import { FormattedMessage } from '@kbn/i18n/react';
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
import { DomainDeprecationDetails } from 'src/core/server/types';
import { DeprecationInfo } from '../../../../../common/types';
import { validateRegExpString } from '../../../lib/utils';
import { GroupByOption, LevelFilterOption } from '../../types';
import { DeprecationLevelFilter } from './level_filter';
import { GroupByFilter } from './group_by_filter';

interface SearchBarProps {
  allDeprecations?: DeprecationInfo[] | DomainDeprecationDetails;

  isLoading: boolean;
  loadData: () => void;
  currentFilter: LevelFilterOption;
  onFilterChange: (filter: LevelFilterOption) => void;
  onSearchChange: (filter: string) => void;
  totalDeprecationsCount: number;
  deprecationLevelsCount: {
    [key: string]: number;
  };
  groupByFilterProps?: {
    availableGroupByOptions: GroupByOption[];
    currentGroupBy: GroupByOption;
    onGroupByChange: (groupBy: GroupByOption) => void;
  };
}

export const SearchBar: FunctionComponent<SearchBarProps> = ({
  totalDeprecationsCount,
  deprecationLevelsCount,
  isLoading,
  loadData,
  currentFilter,
  onFilterChange,
  onSearchChange,
  groupByFilterProps,
}) => {
  const [searchTermError, setSearchTermError] = useState<null | string>(null);
  const filterInvalid = Boolean(searchTermError);
  return (
    <EuiFlexGroup direction="column" responsive={false}>
      <EuiFlexItem grow={true}>
        <EuiFlexGroup alignItems="center" wrap={true} responsive={false}>
          <EuiFlexItem>
            <EuiFieldSearch
              isInvalid={filterInvalid}
              aria-label={i18n.translate(
                'xpack.upgradeAssistant.checkupTab.controls.searchBarPlaceholderAriaLabel',
                { defaultMessage: 'Filter' }
              )}
              placeholder={i18n.translate(
                'xpack.upgradeAssistant.checkupTab.controls.searchBarPlaceholder',
                {
                  defaultMessage: 'Filter',
                }
              )}
              onChange={(e) => {
                const string = e.target.value;
                const errorMessage = validateRegExpString(string);
                if (errorMessage) {
                  // Emit an empty search term to listeners if search term is invalid.
                  onSearchChange('');
                  setSearchTermError(errorMessage);
                } else {
                  onSearchChange(e.target.value);
                  if (searchTermError) {
                    setSearchTermError(null);
                  }
                }
              }}
            />
          </EuiFlexItem>

          {/* These two components provide their own EuiFlexItem wrappers */}
          <DeprecationLevelFilter
            {...{
              totalDeprecationsCount,
              levelsCount: deprecationLevelsCount,
              currentFilter,
              onFilterChange,
            }}
          />
          {groupByFilterProps && <GroupByFilter {...groupByFilterProps} />}

          <EuiFlexItem grow={false}>
            <EuiButton fill onClick={loadData} iconType="refresh" isLoading={isLoading}>
              <FormattedMessage
                id="xpack.upgradeAssistant.checkupTab.controls.refreshButtonLabel"
                defaultMessage="Refresh"
              />
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>

      {filterInvalid && (
        <EuiFlexItem grow={false}>
          <EuiCallOut
            color="danger"
            title={i18n.translate(
              'xpack.upgradeAssistant.checkupTab.controls.filterErrorMessageLabel',
              {
                defaultMessage: 'Filter invalid: {searchTermError}',
                values: { searchTermError },
              }
            )}
            iconType="faceSad"
          />
        </EuiFlexItem>
      )}
    </EuiFlexGroup>
  );
};

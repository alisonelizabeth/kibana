/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
import React, { FunctionComponent } from 'react';
import { EuiAccordion, EuiFlexGroup, EuiFlexItem, EuiText } from '@elastic/eui';

// eslint-disable-next-line @kbn/eslint/no-restricted-paths
import { DomainDeprecationDetails } from 'src/core/server/types';
import { DeprecationHealth } from '../shared';
import { LEVEL_MAP } from '../constants';
import { GroupByOption } from '../types';

const sortByLevelDesc = (a: DomainDeprecationDetails, b: DomainDeprecationDetails) => {
  return -1 * (LEVEL_MAP[a.level] - LEVEL_MAP[b.level]);
};

/**
 * A single accordion item for a grouped deprecation item.
 */
export const KibanaDeprecationAccordion: FunctionComponent<{
  id: string;
  deprecations: DomainDeprecationDetails[];
  title: string;
  currentGroupBy: GroupByOption;
  forceExpand: boolean;
  dataTestSubj: string;
}> = ({ id, deprecations, title, currentGroupBy, forceExpand, dataTestSubj }) => {
  return (
    <EuiAccordion
      id={id}
      data-test-subj={dataTestSubj}
      className="upgDeprecations__item"
      initialIsOpen={forceExpand}
      buttonContent={<span className="upgDeprecations__itemName">{title}</span>}
      extraAction={
        <DeprecationHealth
          single={currentGroupBy === GroupByOption.message}
          deprecationLevels={deprecations.map((d) => LEVEL_MAP[d.level])}
        />
      }
    >
      <div>
        {deprecations.sort(sortByLevelDesc).map((dep, index) => {
          return (
            <div key={`dep-${index}`} className="upgDeprecationCell">
              <EuiFlexGroup responsive={false} wrap alignItems="baseline">
                <EuiFlexItem grow>
                  <EuiText>
                    <p>{dep.message}</p>
                  </EuiText>
                </EuiFlexItem>
              </EuiFlexGroup>
            </div>
          );
        })}
      </div>
    </EuiAccordion>
  );
};

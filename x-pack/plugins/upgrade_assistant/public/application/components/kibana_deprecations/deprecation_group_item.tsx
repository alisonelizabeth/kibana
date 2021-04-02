/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
import React, { FunctionComponent } from 'react';
import { EuiAccordion, EuiFlexGroup, EuiFlexItem, EuiText } from '@elastic/eui';
import { i18n } from '@kbn/i18n';

// eslint-disable-next-line @kbn/eslint/no-restricted-paths
import { DomainDeprecationDetails } from 'src/core/server/types';
import { DeprecationHealth } from '../shared';
import { LEVEL_MAP } from '../constants';

const getDeprecationTitle = (domainId: string) => {
  return i18n.translate('xpack.upgradeAssistant.deprecationGroupItemTitle', {
    defaultMessage: `"${domainId}" is using a deprecated feature`,
  });
};

export interface Props {
  deprecation: DomainDeprecationDetails;
  index: number;
  forceExpand: boolean;
}

/**
 * A single accordion item for a grouped deprecation item.
 */
export const KibanaDeprecationAccordion: FunctionComponent<Props> = ({
  deprecation,
  forceExpand,
  index,
}) => {
  const { domainId, level, message } = deprecation;
  return (
    <EuiAccordion
      id={`${domainId}-${index}`}
      data-test-subj={`${domainId}Deprecation`}
      className="upgDeprecations__item"
      initialIsOpen={forceExpand}
      buttonContent={
        <span className="upgDeprecations__itemName">{getDeprecationTitle(domainId)}</span>
      }
      extraAction={<DeprecationHealth single deprecationLevels={[LEVEL_MAP[level]]} />}
    >
      <div className="upgDeprecationCell">
        <EuiFlexGroup responsive={false} wrap alignItems="baseline">
          <EuiFlexItem grow>
            <EuiText>
              <p>{message}</p>
            </EuiText>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </EuiAccordion>
  );
};

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';
import { FormattedMessage } from '@kbn/i18n/react';
import { EuiCodeBlock, EuiCallOut } from '@elastic/eui';

import { ComponentTemplateDeserialized } from '../../types';

interface Props {
  componentTemplateDetails: ComponentTemplateDeserialized;
}

export const TabAliases: React.FunctionComponent<Props> = ({ componentTemplateDetails }) => {
  const {
    template: { aliases },
  } = componentTemplateDetails;

  if (aliases && Object.keys(aliases).length) {
    return (
      <div data-test-subj="aliasesTabContent">
        <EuiCodeBlock lang="json">{JSON.stringify(aliases, null, 2)}</EuiCodeBlock>
      </div>
    );
  }

  return (
    <EuiCallOut
      title={
        <FormattedMessage
          id="xpack.idxMgmt.componentTemplateDetails.aliasesTab.noAliasesTitle"
          defaultMessage="No aliases defined."
        />
      }
      iconType="pin"
      data-test-subj="noAliasesCallout"
      size="s"
    />
  );
};

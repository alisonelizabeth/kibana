/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';

import {
  EuiPageBody,
  EuiPageContent,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
} from '@elastic/eui';
import { FormattedMessage } from '@kbn/i18n/react';
import { EuiSpacer, EuiText } from '@elastic/eui';
import { documentationService } from '../../services';

export const PipelinesList: React.FunctionComponent = () => {
  return (
    <EuiPageBody>
      <EuiPageContent>
        <EuiTitle size="l">
          <EuiFlexGroup alignItems="center">
            <EuiFlexItem>
              <h1>
                <FormattedMessage
                  id="xpack.ingestPipelines.pipelinesListTitle"
                  defaultMessage="Ingest Pipelines"
                />
              </h1>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty
                href={documentationService.getIngestNodeUrl()}
                target="_blank"
                iconType="help"
              >
                <FormattedMessage
                  id="xpack.ingestPipelines.pipelinesListDocsLinkText"
                  defaultMessage="Ingest Pipelines docs"
                />
              </EuiButtonEmpty>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiTitle>

        <EuiSpacer size="s" />

        <EuiTitle size="s">
          <EuiText color="subdued">
            <FormattedMessage
              id="xpack.ingestPipelines.pipelinesListDescription"
              defaultMessage="Use ingest node pipelines to pre-process documents before indexing."
            />
          </EuiText>
        </EuiTitle>
      </EuiPageContent>
    </EuiPageBody>
  );
};

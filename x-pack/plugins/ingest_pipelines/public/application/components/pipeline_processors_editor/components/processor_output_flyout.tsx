/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React, { useState } from 'react';
import { FormattedMessage } from '@kbn/i18n/react';
import { i18n } from '@kbn/i18n';

import {
  EuiCodeBlock,
  EuiFlyout,
  EuiFlyoutHeader,
  EuiFlyoutBody,
  EuiTitle,
  EuiFlyoutFooter,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
  EuiSpacer,
  EuiCallOut,
  EuiBadge,
} from '@elastic/eui';
import { useTestConfigContext } from '../context';

export interface Props {
  processor: any;
  onClose: () => void;
}

export const ProcessorOutputFlyout: React.FunctionComponent<Props> = ({ processor, onClose }) => {
  const { testConfig } = useTestConfigContext();
  const { type: processorType, id: processorId } = processor;

  const { documents, output } = testConfig;

  // TODO for now, only accounting for first doc
  const processorInput = documents![0];
  const processorOutput = output[0][processorId];

  console.log(testConfig);

  console.log(processor);
  return (
    <EuiFlyout onClose={onClose} maxWidth={550} data-test-subj="processorOutputFlyout">
      <EuiFlyoutHeader>
        <EuiTitle size="m">
          <h2 data-test-subj="title">
            {i18n.translate('xpack.ingestPipelines.processorOutput.title', {
              defaultMessage: `'{processorType}' processor output`,
              values: {
                processorType,
              },
            })}
          </h2>
        </EuiTitle>
      </EuiFlyoutHeader>

      <EuiFlyoutBody data-test-subj="content">
        {/* TODO i18n */}
        <p>Processor input</p>
        <EuiCodeBlock paddingSize="s" language="json" isCopyable>
          {JSON.stringify(processorInput, null, 2)}
        </EuiCodeBlock>

        <EuiSpacer />

        {/* TODO i18n */}
        <p>Processor output</p>
        <EuiCodeBlock paddingSize="s" language="json" isCopyable>
          {JSON.stringify(processorOutput, null, 2)}
        </EuiCodeBlock>
      </EuiFlyoutBody>
    </EuiFlyout>
  );
};

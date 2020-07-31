/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React, { useState } from 'react';
import { FormattedMessage } from '@kbn/i18n/react';
import { i18n } from '@kbn/i18n';

import {
  EuiAccordion,
  EuiBadge,
  EuiButtonEmpty,
  EuiCallOut,
  EuiCodeBlock,
  EuiFlyout,
  EuiFlyoutHeader,
  EuiFlyoutBody,
  EuiIcon,
  EuiText,
  EuiTitle,
  EuiToolTip,
  EuiFlyoutFooter,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPagination,
  EuiSpacer,
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

  const [activePage, setActivePage] = useState(0);

  const processorInput = documents![activePage];
  const processorOutput = output[activePage][processorId];

  console.log('testConfig', testConfig);
  console.log('processor', processor);

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
        {documents.length > 1 && (
          <>
            <EuiPagination
              pageCount={documents.length - 1}
              activePage={activePage}
              onPageClick={(page) => setActivePage(page)}
              compressed
            />
            <EuiSpacer />
          </>
        )}
        {/* TODO i18n */}
        <p>Ingest document</p>
        <EuiCodeBlock paddingSize="s" language="json" isCopyable>
          {JSON.stringify(processorInput, null, 2)}
        </EuiCodeBlock>

        {processorOutput?.doc && (
          <>
            <EuiSpacer />
            {/* TODO i18n */}
            <p>Processor output</p>
            <EuiCodeBlock paddingSize="s" language="json" isCopyable>
              {JSON.stringify(processorOutput.doc, null, 2)}
            </EuiCodeBlock>
          </>
        )}

        {processorOutput?.ignored_error && (
          <>
            <EuiSpacer />
            <EuiAccordion
              id="accordion1"
              buttonContent={
                <EuiText>
                  <p>View ignored error</p>
                </EuiText>
              }
            >
              <>
                <EuiSpacer />
                <EuiCodeBlock paddingSize="s" language="json" isCopyable>
                  {JSON.stringify(processorOutput.ignored_error, null, 2)}
                </EuiCodeBlock>
              </>
            </EuiAccordion>
          </>
        )}
      </EuiFlyoutBody>
    </EuiFlyout>
  );
};

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
import { useTestPipelineContext } from '../../context';

export interface Props {
  processor: any;
  onClose: () => void;
}

export const ProcessorOutput: React.FunctionComponent<Props> = ({ processor, onClose }) => {
  const { testPipelineData } = useTestPipelineContext();
  const { type: processorType, id: processorId } = processor;

  const { resultsByProcessor, documents } = testPipelineData;

  const [activePage, setActivePage] = useState(0);

  const processorOutput = resultsByProcessor[activePage][processorId];
  const { prevProcessorResult, doc: currentResult, ignored_error: ignoredError } = processorOutput;

  return (
    <>
      <EuiText>
        <p>
          <FormattedMessage
            id="xpack.ingestPipelines.processorOutput.descriptionText"
            defaultMessage="View how the processor affects the ingest document as it passes through the pipeline."
          />
        </p>
      </EuiText>

      {currentResult && (
        <>
          <EuiSpacer />
          <EuiFlexGroup justifyContent="spaceBetween" gutterSize="s">
            <EuiFlexItem>
              {/* TODO i18n */}
              <p>Processor output</p>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              {documents.length > 1 && (
                <EuiPagination
                  pageCount={documents.length - 1}
                  activePage={activePage}
                  onPageClick={(page) => setActivePage(page)}
                  compressed
                />
              )}
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiCodeBlock paddingSize="s" language="json" isCopyable>
            {JSON.stringify(currentResult, null, 2)}
          </EuiCodeBlock>
        </>
      )}

      {prevProcessorResult?.doc && (
        <>
          <EuiSpacer />
          <EuiAccordion
            id="prev_accordion"
            buttonContent={
              <EuiText>
                {/* TODO i18n */}
                <p>View previous processor result</p>
              </EuiText>
            }
          >
            <>
              <EuiSpacer />
              <EuiCodeBlock paddingSize="s" language="json" isCopyable>
                {JSON.stringify(prevProcessorResult.doc, null, 2)}
              </EuiCodeBlock>
            </>
          </EuiAccordion>
        </>
      )}

      {ignoredError && (
        <>
          <EuiSpacer />
          <EuiAccordion
            id="ignored_error_accordion"
            buttonContent={
              <EuiText>
                {/* TODO i18n */}
                <p>View ignored error</p>
              </EuiText>
            }
          >
            <>
              <EuiSpacer />
              <EuiCodeBlock paddingSize="s" language="json" isCopyable>
                {JSON.stringify(ignoredError, null, 2)}
              </EuiCodeBlock>
            </>
          </EuiAccordion>
        </>
      )}
    </>
  );
};

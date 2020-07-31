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
  EuiSpacer,
  EuiText,
  EuiSwitch,
  EuiButton,
  EuiLoadingSpinner,
  EuiFlexGroup,
  EuiFlexItem,
} from '@elastic/eui';

import { useTestPipelineContext, usePipelineProcessorsContext } from '../../../context';

interface Props {
  executeOutput?: { docs: object[] };
  handleExecute: (documents: object[], verbose: boolean) => void;
  isExecuting: boolean;
}

export const OutputTab: React.FunctionComponent<Props> = ({
  executeOutput,
  handleExecute,
  isExecuting,
}) => {
  const { setCurrentTestPipelineData, testPipelineData } = useTestPipelineContext();
  const { documents: cachedDocuments } = testPipelineData;

  const { links, toasts } = usePipelineProcessorsContext();

  const [isVerboseEnabled, setIsVerboseEnabled] = useState(false);

  const onEnableVerbose = async (isVerbose: boolean) => {
    setIsVerboseEnabled(isVerbose);

    await handleExecute(cachedDocuments!, isVerbose);

    // TODO what happens when the request fails?
    toasts.addSuccess(
      i18n.translate('xpack.ingestPipelines.testPipelineFlyout.successNotificationText', {
        defaultMessage: 'Pipeline executed',
      }),
      {
        toastLifeTimeMs: 1000,
      }
    );
  };

  let content: React.ReactNode | undefined;

  if (isExecuting) {
    content = <EuiLoadingSpinner size="m" />;
  } else if (executeOutput) {
    content = (
      <EuiCodeBlock language="json" isCopyable>
        {JSON.stringify(executeOutput, null, 2)}
      </EuiCodeBlock>
    );
  }

  return (
    <>
      <EuiText>
        <p>
          <FormattedMessage
            id="xpack.ingestPipelines.testPipelineFlyout.outputTab.descriptionText"
            defaultMessage="View the output data, or see how each processor affects the document as it passes through the pipeline."
          />
        </p>
      </EuiText>

      <EuiSpacer size="l" />

      <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiSwitch
            label={
              <FormattedMessage
                id="xpack.ingestPipelines.testPipelineFlyout.outputTab.verboseSwitchLabel"
                defaultMessage="View verbose output"
              />
            }
            checked={isVerboseEnabled}
            onChange={(e) => onEnableVerbose(e.target.checked)}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton
            size="s"
            onClick={() => handleExecute(cachedDocuments!, isVerboseEnabled)}
            iconType="refresh"
          >
            <FormattedMessage
              id="xpack.ingestPipelines.testPipelineFlyout.outputTab.descriptionLinkLabel"
              defaultMessage="Refresh output"
            />
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="m" />

      {content}
    </>
  );
};

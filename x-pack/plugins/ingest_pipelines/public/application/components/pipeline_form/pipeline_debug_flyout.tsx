/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React, { useRef } from 'react';
import { FormattedMessage } from '@kbn/i18n/react';

import {
  EuiButtonEmpty,
  EuiButton,
  EuiFlexItem,
  EuiFlexGroup,
  EuiCodeBlock,
  EuiIconTip,
  EuiSwitch,
  EuiCodeEditor,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '@elastic/eui';

interface Props {
  closeFlyout: () => void;
}

export const PipelineDebugFlyout: React.FunctionComponent<Props> = ({ closeFlyout }) => {
  return (
    <EuiFlyout maxWidth={480} onClose={closeFlyout}>
      <EuiFlyoutHeader>
        <EuiTitle>
          <h2>
            {
              <FormattedMessage
                id="xpack.ingestPipelines.debugFlyout.title"
                defaultMessage="Add documents"
              />
            }
          </h2>
        </EuiTitle>
      </EuiFlyoutHeader>

      <EuiFlyoutBody>
        <EuiText>
          <p>
            <FormattedMessage
              id="xpack.ingestPipelines.debugFlyout.descriptionText"
              defaultMessage="Provide an array of documents to be ingested by the pipeline."
            />
          </p>
        </EuiText>

        <EuiSpacer />

        <EuiSwitch
          label={
            <>
              <FormattedMessage
                id="xpack.ingestPipelines.debugFlyout.verboseSwitchLabel"
                defaultMessage="Enable verbose output"
              />{' '}
              <EuiIconTip content="TBD" position="right" />
            </>
          }
          checked={false}
          onChange={e => {}}
        />

        <EuiSpacer />

        <EuiTitle size="xs">
          <h3>
            <FormattedMessage
              id="xpack.ingestPipelines.debugFlyout.editorLabe;"
              defaultMessage="Documents"
            />
          </h3>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiCodeEditor
          mode="json"
          theme="textmate"
          width="100%"
          value={JSON.stringify([], null, 2)}
        />
      </EuiFlyoutBody>

      <EuiFlyoutFooter>
        <EuiFlexGroup justifyContent="spaceBetween">
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty iconType="cross" onClick={closeFlyout} flush="left">
              <FormattedMessage
                id="xpack.ingestPipelines.debugFlyout.closeButtonLabel"
                defaultMessage="Close"
              />
            </EuiButtonEmpty>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton onClick={closeFlyout} fill>
              Run
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlyoutFooter>
    </EuiFlyout>
  );
};

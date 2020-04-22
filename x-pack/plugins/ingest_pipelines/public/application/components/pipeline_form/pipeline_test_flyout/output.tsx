/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React, { useState, useEffect } from 'react';
import { FormattedMessage } from '@kbn/i18n/react';
import { i18n } from '@kbn/i18n';

import {
  EuiButtonEmpty,
  EuiButton,
  EuiFlexItem,
  EuiFlexGroup,
  EuiCodeBlock,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  EuiSpacer,
  EuiText,
  EuiTitle,
  EuiSwitch,
} from '@elastic/eui';

import { Pipeline } from '../../../../../common/types';
import {
  useForm,
  Form,
  getUseField,
  Field,
  JsonEditorField,
  useKibana,
  FormConfig,
} from '../../../../shared_imports';
import { SectionError } from '../../section_error';
import { pipelineTestSchema } from './pipeline_test_schema';
import { PipelineTestTabs, Tab } from './pipeline_test_tabs';

export interface PipelineTestFlyoutProps {
  closeFlyout: () => void;
  pipeline: Pipeline;
  setDataGetter: any;
  documentsCache?: object[];
  updateDocumentsCache: () => Promise<void>;
}

export const Output = ({ isVerboseEnabled, setIsVerboseEnabled, executeOutput }) => {
  return (
    <>
      <EuiText>
        <p>
          <FormattedMessage
            id="xpack.ingestPipelines.testPipelineFlyout.outputTab.descriptionText"
            defaultMessage="The output of the executed pipeline."
          />
        </p>
      </EuiText>

      <EuiSpacer size="m" />

      <EuiSwitch
        label={
          <FormattedMessage
            id="xpack.ingestPipelines.testPipelineFlyout.outputTab.verboseFieldLabel"
            defaultMessage="View verbose output"
          />
        }
        checked={isVerboseEnabled}
        onChange={e => {
          setIsVerboseEnabled(e.target.checked);
          // TODO also kick off execution again
        }}
      />

      <EuiSpacer size="m" />

      <EuiCodeBlock language="json" isCopyable>
        {JSON.stringify(executeOutput, null, 2)}
      </EuiCodeBlock>
    </>
  );
};

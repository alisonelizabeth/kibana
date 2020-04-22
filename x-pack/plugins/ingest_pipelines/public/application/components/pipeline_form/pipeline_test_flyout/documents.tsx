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
import { Output } from './output';

export interface PipelineTestFlyoutProps {
  closeFlyout: () => void;
  pipeline: Pipeline;
  setDataGetter: any;
  documentsCache?: object[];
  updateDocumentsCache: () => Promise<void>;
}

const UseField = getUseField({ component: Field });

export const Documents = ({}) => {
  return (
    <>
      <EuiText>
        <p>
          <FormattedMessage
            id="xpack.ingestPipelines.testPipelineFlyout.documentsTab.descriptionText"
            defaultMessage="Provide an array of documents to be ingested by the pipeline."
          />
        </p>
      </EuiText>

      <EuiSpacer size="m" />

      {/* Documents editor */}
      <UseField
        path="documents"
        component={JsonEditorField}
        componentProps={{
          ['data-test-subj']: 'documentsField',
          euiCodeEditorProps: {
            height: '300px',
            'aria-label': i18n.translate(
              'xpack.ingestPipelines.testPipelineFlyout.documentsFieldAriaLabel',
              {
                defaultMessage: 'Documents JSON editor',
              }
            ),
          },
        }}
      />
    </>
  );
};

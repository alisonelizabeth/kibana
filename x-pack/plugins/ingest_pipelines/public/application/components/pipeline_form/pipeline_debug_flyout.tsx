/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React, { useRef } from 'react';
import { FormattedMessage } from '@kbn/i18n/react';
import { i18n } from '@kbn/i18n';

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
  EuiFormRow,
} from '@elastic/eui';

import { Pipeline } from '../../../../common/types';
import {
  useForm,
  Form,
  getUseField,
  getFormRow,
  Field,
  FormConfig,
  JsonEditorField,
  useKibana,
} from '../../../shared_imports';
import { debugFormSchema } from './debug_schema';

interface Props {
  closeFlyout: () => void;
  defaultValue?: any; // todo fix
  executePipeline: () => void;
  isExecuting: boolean;
  executeError: any; // todo fix?
}

const UseField = getUseField({ component: Field });

export const PipelineDebugFlyout: React.FunctionComponent<Props> = ({
  closeFlyout,
  defaultValue,
  executePipeline,
  isExecuting,
  executeError,
}) => {
  const { form } = useForm({
    schema: debugFormSchema,
    // TODO move this out into pipeline_debug?
    defaultValue: {
      verbose: false,
      documents: '',
    },
    onSubmit: executePipeline,
  });

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

        {/* TODO: Add error validation */}
        <Form form={form} data-test-subj="addDocumentsForm">
          {/* Verbose toggle */}
          <UseField
            path="verbose"
            componentProps={{
              ['data-test-subj']: 'verboseField',
            }}
          />

          {/* Documents editor */}
          <UseField
            path="documents"
            component={JsonEditorField}
            componentProps={{
              ['data-test-subj']: 'documentsField',
              euiCodeEditorProps: {
                height: '300px',
                'aria-label': i18n.translate(
                  'xpack.ingestPipelines.debugFlyout.documentsFieldAriaLabel',
                  {
                    defaultMessage: 'Documents JSON editor',
                  }
                ),
              },
            }}
          />
        </Form>
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
            <EuiButton onClick={form.submit} fill iconType="play" isLoading={isExecuting}>
              {isExecuting ? (
                <FormattedMessage
                  id="xpack.ingestPipelines.debugFlyout.runningButtonLabel"
                  defaultMessage="Running"
                />
              ) : (
                <FormattedMessage
                  id="xpack.ingestPipelines.debugFlyout.runButtonLabel"
                  defaultMessage="Run"
                />
              )}
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlyoutFooter>
    </EuiFlyout>
  );
};

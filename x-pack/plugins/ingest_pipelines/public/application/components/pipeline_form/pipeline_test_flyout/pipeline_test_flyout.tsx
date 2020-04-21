/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React, { useState } from 'react';
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

interface Props {
  closeFlyout: () => void;
  pipeline: Pipeline;
  initialDocuments?: object[];
}

const UseField = getUseField({ component: Field });

export const PipelineTestFlyout: React.FunctionComponent<Props> = ({
  closeFlyout,
  pipeline,
  initialDocuments = '',
}) => {
  const { services } = useKibana();

  const [selectedTab, setSelectedTab] = useState<Tab>('documents');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executeError, setExecuteError] = useState<any>(null);
  const [executeOutput, setExecuteOutput] = useState<any>(undefined);

  const { name: pipelineName, ...pipelineDefinition } = pipeline;

  const executePipeline: FormConfig['onSubmit'] = async (formData, isValid) => {
    if (!isValid) {
      return;
    }

    const { documents } = formData;

    setIsExecuting(true);
    setExecuteError(null);

    const { error, data: output } = await services.api.simulatePipeline({
      documents,
      pipeline: pipelineDefinition,
    });

    setIsExecuting(false);

    if (error) {
      setExecuteError(error);
      return;
    }

    setSelectedTab('output');
    setExecuteOutput(output);
  };

  const { form } = useForm({
    schema: pipelineTestSchema,
    defaultValue: {
      documents: initialDocuments,
    },
    onSubmit: executePipeline,
  });

  let tabContent;

  if (selectedTab === 'output') {
    tabContent = (
      <EuiCodeBlock language="json" isCopyable>
        {JSON.stringify(executeOutput, null, 2)}
      </EuiCodeBlock>
    );
  } else {
    // Default to 'documents' tab
    tabContent = (
      <>
        {/* Execute error */}
        {executeError ? (
          <>
            <SectionError
              title={
                <FormattedMessage
                  id="xpack.ingestPipelines.testPipelineFlyout.executePipelineError"
                  defaultMessage="Unable to execute pipeline"
                />
              }
              error={executeError}
              data-test-subj="executePipelineError"
            />
            <EuiSpacer size="m" />
          </>
        ) : null}

        <EuiText>
          <p>
            <FormattedMessage
              id="xpack.ingestPipelines.testPipelineFlyout.descriptionText"
              defaultMessage="Provide an array of documents to be ingested by the pipeline."
            />
          </p>
        </EuiText>

        <EuiSpacer size="m" />

        <Form form={form} data-test-subj="addDocumentsForm">
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
        </Form>
      </>
    );
  }

  return (
    <EuiFlyout maxWidth={480} onClose={closeFlyout}>
      <EuiFlyoutHeader>
        <EuiTitle>
          <h2>
            {pipelineName ? (
              <FormattedMessage
                id="xpack.ingestPipelines.testPipelineFlyout.withPipelineNametitle"
                defaultMessage="Test pipeline '{pipelineName}'"
                values={{
                  pipelineName,
                }}
              />
            ) : (
              <FormattedMessage
                id="xpack.ingestPipelines.testPipelineFlyout.title"
                defaultMessage="Test pipeline"
              />
            )}
          </h2>
        </EuiTitle>
      </EuiFlyoutHeader>

      <EuiFlyoutBody>
        <PipelineTestTabs
          onTabChange={setSelectedTab}
          selectedTab={selectedTab}
          getIsDisabled={tabId => !executeOutput && tabId === 'output'}
        />

        <EuiSpacer />

        {tabContent}
      </EuiFlyoutBody>

      <EuiFlyoutFooter>
        <EuiFlexGroup justifyContent="spaceBetween">
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty iconType="cross" onClick={closeFlyout} flush="left">
              <FormattedMessage
                id="xpack.ingestPipelines.testPipelineFlyout.closeButtonLabel"
                defaultMessage="Close"
              />
            </EuiButtonEmpty>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton onClick={form.submit} fill iconType="play" isLoading={isExecuting}>
              {isExecuting ? (
                <FormattedMessage
                  id="xpack.ingestPipelines.testPipelineFlyout.runningButtonLabel"
                  defaultMessage="Running"
                />
              ) : (
                <FormattedMessage
                  id="xpack.ingestPipelines.testPipelineFlyout.runButtonLabel"
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

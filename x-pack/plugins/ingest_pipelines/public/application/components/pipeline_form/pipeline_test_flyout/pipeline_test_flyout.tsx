/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React, { useState, useEffect, useContext } from 'react';
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
import { Documents } from './documents';
import { documentContext } from '../documents';

export interface PipelineTestFlyoutProps {
  closeFlyout: () => void;
  pipeline: Pipeline;
}

export const PipelineTestFlyout: React.FunctionComponent<PipelineTestFlyoutProps> = ({
  closeFlyout,
  pipeline,
}) => {
  const { services } = useKibana();
  const { setCurrentDocuments, documents: currentDocuments } = useContext(documentContext);

  const [selectedTab, setSelectedTab] = useState<Tab>('documents');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executeError, setExecuteError] = useState<any>(null);
  const [executeOutput, setExecuteOutput] = useState<any>(undefined);
  const [isVerboseEnabled, setIsVerboseEnabled] = useState<boolean>(false);

  const { name: pipelineName, ...pipelineDefinition } = pipeline;

  const executePipeline: FormConfig['onSubmit'] = async (formData, isValid) => {
    if (!isValid) {
      return;
    }

    const { documents } = formData;
    const isDocumentsTab = selectedTab === 'documents';

    setIsExecuting(true);
    setExecuteError(null);

    const { error, data: output } = await services.api.simulatePipeline({
      documents: isDocumentsTab ? documents : currentDocuments!.documents,
      pipeline: pipelineDefinition,
      verbose: isVerboseEnabled,
    });

    setIsExecuting(false);

    if (error) {
      setExecuteError(error);
      return;
    }

    // update context, only applicable on documents tab
    // TODO add verbose to schema
    // TODO here we would either update documents context or verbose
    if (isDocumentsTab) {
      setCurrentDocuments({ documents });
    }

    // setSelectedTab('output');
    setExecuteOutput(output);
  };

  const { form } = useForm({
    schema: pipelineTestSchema,
    defaultValue: {
      documents: currentDocuments?.documents || '',
    },
    onSubmit: executePipeline,
  });

  // Default to 'documents' tab
  let tabContent = <Documents />;

  if (selectedTab === 'output') {
    tabContent = (
      <Output
        isVerboseEnabled={isVerboseEnabled}
        setIsVerboseEnabled={setIsVerboseEnabled}
        executeOutput={executeOutput}
      />
    );
  }

  return (
    <EuiFlyout
      maxWidth={480}
      onClose={async () => {
        // await updateDocumentsCache();
        closeFlyout();
      }}
    >
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
          onTabChange={async tab => {
            // await updateDocumentsCache();
            setSelectedTab(tab);
          }}
          selectedTab={selectedTab}
          getIsDisabled={tabId => !executeOutput && tabId === 'output'}
        />

        <EuiSpacer />

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

        <Form form={form} data-test-subj="testPipelineForm">
          {tabContent}
        </Form>
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

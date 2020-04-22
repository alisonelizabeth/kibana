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
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  EuiSpacer,
  EuiTitle,
} from '@elastic/eui';

import { Pipeline } from '../../../../../common/types';
import { useForm, Form, useKibana, FormConfig } from '../../../../shared_imports';
import { SectionError } from '../../section_error';
import { pipelineTestSchema } from './pipeline_test_schema';
import { PipelineTestTabs, Tab } from './pipeline_test_tabs';
import { OutputTab } from './tab_output';
import { DocumentsTab } from './tab_documents';
import { testConfigContext, TestConfig } from '../test_config_context';

export interface Props {
  closeFlyout: () => void;
  pipeline: Pipeline;
}

export const PipelineTestFlyout: React.FunctionComponent<Props> = ({ closeFlyout, pipeline }) => {
  const { services } = useKibana();

  const { setCurrentTestConfig, testConfig } = useContext(testConfigContext);
  const {
    verbose: cachedVerbose,
    documents: cachedDocuments,
    executeOutput: cachedExecuteOutput,
  } = testConfig;

  const initialSelectedTab = cachedExecuteOutput ? 'output' : 'documents';
  const [selectedTab, setSelectedTab] = useState<Tab>(initialSelectedTab);

  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executeError, setExecuteError] = useState<any>(null);

  const { name: pipelineName, ...pipelineDefinition } = pipeline;

  const executePipeline: FormConfig['onSubmit'] = async (formData, isValid) => {
    if (!isValid) {
      return;
    }

    const { documents, verbose } = formData as TestConfig;
    const isDocumentsTab = selectedTab === 'documents';
    const isOutputTab = selectedTab === 'output';
    const currentDocuments = isDocumentsTab ? documents : testConfig!.documents;
    const currentVerbose = isOutputTab ? verbose : testConfig!.verbose;

    setIsExecuting(true);
    setExecuteError(null);

    const { error, data: output } = await services.api.simulatePipeline({
      documents: currentDocuments,
      pipeline: pipelineDefinition,
      verbose: currentVerbose,
    });

    setIsExecuting(false);

    if (error) {
      setExecuteError(error);
      return;
    }

    // Update context if successful
    setCurrentTestConfig({
      verbose: currentVerbose,
      documents: currentDocuments,
      executeOutput: output,
    });

    setSelectedTab('output');
    // TODO Add toast notification
  };

  const { form } = useForm({
    schema: pipelineTestSchema,
    defaultValue: {
      documents: cachedDocuments || '',
      verbose: cachedVerbose || false,
    },
    onSubmit: executePipeline,
  });

  // Default to "documents" tab
  let tabContent = (
    <DocumentsTab
      changeTabs={() => setSelectedTab('output')}
      isResultsLinkDisabled={isExecuting || Boolean(!cachedExecuteOutput)}
    />
  );

  if (selectedTab === 'output') {
    tabContent = <OutputTab executeOutput={cachedExecuteOutput!} />;
  }

  return (
    <EuiFlyout maxWidth={480} onClose={closeFlyout}>
      <EuiFlyoutHeader>
        <EuiTitle>
          <h2>
            {pipelineName ? (
              <FormattedMessage
                id="xpack.ingestPipelines.testPipelineFlyout.withPipelineNameTitle"
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
          getIsDisabled={tabId => !cachedExecuteOutput && tabId === 'output'}
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

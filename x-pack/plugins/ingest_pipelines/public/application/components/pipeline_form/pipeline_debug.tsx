/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import React, { useState, useEffect } from 'react';
import { FormattedMessage } from '@kbn/i18n/react';
import { i18n } from '@kbn/i18n';
import {
  EuiButton,
  EuiEmptyPrompt,
  EuiText,
  EuiCodeBlock,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiSwitch,
  EuiLink,
} from '@elastic/eui';

import { Pipeline } from '../../../../common/types';
import { useKibana } from '../../../shared_imports';

import { PipelineDebugFlyout } from './pipeline_debug_flyout';

// todo fix
interface Props {
  onSave: (pipeline: Pipeline) => void;
  onCancel: () => void;
  isSaving: boolean;
  saveError: any;
  defaultValue?: Pipeline;
  isEditing?: boolean;
  setDataGetter: (dataGetter: any) => void;
  pipeline: Pipeline;
}

export const PipelineDebugTab: React.FunctionComponent<Props> = ({ pipeline }) => {
  const { services } = useKibana();

  const [isDocEditorVisible, setIsDocEditorVisible] = useState<boolean>(false);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executeError, setExecuteError] = useState<any>(null);
  // const [setExecuteOutput, executeOutput] = useState<any>(undefined);

  const executePipeline = async data => {
    // TODO update documents ref
    const { documents, verbose } = data;
    const { name, version, ...pipelineDefinition } = pipeline;

    setIsExecuting(true);
    setExecuteError(null);

    const { error, data: output } = await services.api.simulatePipeline({
      documents,
      verbose,
      pipeline: pipelineDefinition,
    });

    setIsExecuting(false);

    if (error) {
      setExecuteError(error);
      return;
    }

    setIsDocEditorVisible(false);
    // setExecuteOutput(output);
  };

  const content = (
    <EuiEmptyPrompt
      iconType="wrench"
      title={
        <h2>
          {i18n.translate('xpack.ingestPipelines.debug.emptyPromptTitle', {
            defaultMessage: 'Debug your pipeline',
          })}
        </h2>
      }
      body={
        <p>
          {i18n.translate('xpack.ingestPipelines.debug.emptyPromptDescription', {
            defaultMessage: 'Execute your pipeline against a set of documents.',
          })}
        </p>
      }
      actions={
        <EuiButton
          color="primary"
          fill
          iconType="plusInCircle"
          disabled={isDocEditorVisible}
          onClick={() => setIsDocEditorVisible(true)}
        >
          {i18n.translate('xpack.ingestPipelines.debug.emptyPrompt.addDocumentsButtonLabel', {
            defaultMessage: 'Add documents',
          })}
        </EuiButton>
      }
    />
  );

  // if (executeOutput) {
  //   content = <EuiCodeBlock language="json">{JSON.stringify(executeOutput, null, 2)}</EuiCodeBlock>;
  // }

  // console.log(executeOutput);

  return (
    <>
      {/* <EuiText>
        <p>
          {i18n.translate('xpack.ingestPipelines.debug.emptyPromptDescription', {
            defaultMessage: 'Execute your pipeline against a set of documents.',
          })}
          <EuiButtonEmpty
            color="primary"
            iconType="refresh"
            onClick={() => setIsDocEditorVisible(true)}
          >
            {i18n.translate('xpack.ingestPipelines.debug.emptyPrompt.addDocumentsButtonLabel', {
              defaultMessage: 'Rerun debugger',
            })}
          </EuiButtonEmpty>
        </p>
        <p>
          <b>
            <FormattedMessage
              id="xpack.ingestPipelines.debug.outputDescriptionText"
              defaultMessage="Output"
            />
          </b>
        </p>
          </EuiText> */}

      {content}

      {/* Add documents flyout */}
      {isDocEditorVisible && (
        <PipelineDebugFlyout
          isExecuting={isExecuting}
          executeError={executeError}
          executePipeline={executePipeline}
          closeFlyout={() =>
            setIsDocEditorVisible(prevIsDocEditorVisible => !prevIsDocEditorVisible)
          }
        />
      )}
    </>
  );
};

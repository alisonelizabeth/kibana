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
import { Pipeline } from '../../../../common/types';

import { PipelineDebugFlyout } from './pipeline_debug_flyout';

interface Props {
  onSave: (pipeline: Pipeline) => void;
  onCancel: () => void;
  isSaving: boolean;
  saveError: any;
  defaultValue?: Pipeline;
  isEditing?: boolean;
  setDataGetter: (dataGetter: any) => void;
}

const UseField = getUseField({ component: Field });
const FormRow = getFormRow({ titleTag: 'h3' });

export const PipelineDebugTab: React.FunctionComponent<Props> = ({ pipeline }) => {
  // const { services } = useKibana();

  const [isDocEditorVisible, setIsDocEditorVisible] = useState<boolean>(false);

  // console.log(pipeline);

  // const { form } = useForm({
  //   schema: debugFormSchema,
  //   defaultValue,
  // });

  // useEffect(() => {
  //   setDataGetter(form.submit);
  // }, [form.submit, setDataGetter]);

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
      </EuiText>
      <EuiCodeBlock language="json">{JSON.stringify(STUBBED_DATA, null, 2)}</EuiCodeBlock> */}

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
            onClick={() => setIsDocEditorVisible(true)}
          >
            {i18n.translate('xpack.ingestPipelines.debug.emptyPrompt.addDocumentsButtonLabel', {
              defaultMessage: 'Add documents',
            })}
          </EuiButton>
        }
      />
      {isDocEditorVisible && (
        <PipelineDebugFlyout
          closeFlyout={() =>
            setIsDocEditorVisible(prevIsDocEditorVisible => !prevIsDocEditorVisible)
          }
        />
      )}
    </>
  );
};

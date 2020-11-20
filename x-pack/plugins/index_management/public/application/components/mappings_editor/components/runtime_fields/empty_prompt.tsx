/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { i18n } from '@kbn/i18n';
import { FormattedMessage } from '@kbn/i18n/react';
import { EuiEmptyPrompt, EuiLink, EuiButton } from '@elastic/eui';

interface Props {
  createField: () => void;
  runtimeFieldsDocsUri: string;
}

export const EmptyPrompt: FunctionComponent<Props> = ({ createField, runtimeFieldsDocsUri }) => {
  return (
    <EuiEmptyPrompt
      iconType="managementApp"
      data-test-subj="emptyList"
      title={
        <h2 data-test-subj="title">
          {i18n.translate('xpack.idxMgmt.mappingsEditor.runtimeFields.emptyPromptTitle', {
            defaultMessage: 'Start by creating a runtime field',
          })}
        </h2>
      }
      body={
        <p>
          <FormattedMessage
            id="xpack.idxMgmt.mappingsEditor.runtimeFields.emptyPromptDescription"
            defaultMessage="For example, you can create a runtime field for a visualisation without the need of indexing it yet and occupying disk space."
          />
          <br />
          <EuiLink
            href={runtimeFieldsDocsUri}
            target="_blank"
            data-test-subj="learnMoreLink"
            external
          >
            {i18n.translate(
              'xpack.idxMgmt.mappingsEditor.runtimeFields.emptyPromptDocumentionLink',
              {
                defaultMessage: 'Learn more.',
              }
            )}
          </EuiLink>
        </p>
      }
      actions={
        <EuiButton
          onClick={() => createField()}
          iconType="plusInCircle"
          data-test-subj="createRuntimeFieldButton"
          fill
        >
          {i18n.translate('xpack.idxMgmt.mappingsEditor.runtimeFields.emptyPromptButtonLabel', {
            defaultMessage: 'Create a runtime field',
          })}
        </EuiButton>
      }
    />
  );
};

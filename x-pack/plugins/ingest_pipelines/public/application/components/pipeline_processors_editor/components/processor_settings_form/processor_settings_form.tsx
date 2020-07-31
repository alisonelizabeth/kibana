/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { i18n } from '@kbn/i18n';
import { FormattedMessage } from '@kbn/i18n/react';
import React, { FunctionComponent, memo, useEffect } from 'react';
import {
  EuiButton,
  EuiButtonEmpty,
  EuiHorizontalRule,
  EuiFlyout,
  EuiFlyoutHeader,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
} from '@elastic/eui';

import { Form, FormDataProvider, FormHook } from '../../../../../shared_imports';
import { ProcessorInternal } from '../../types';

import { DocumentationButton } from './documentation_button';
import { getProcessorFormDescriptor } from './map_processor_type_to_form';
import { CommonProcessorFields, ProcessorTypeField } from './processors/common_fields';
import { Custom } from './processors/custom';

export interface Props {
  processor?: ProcessorInternal;
  form: FormHook;
}

const updateButtonLabel = i18n.translate(
  'xpack.ingestPipelines.settingsFormOnFailureFlyout.updateButtonLabel',
  { defaultMessage: 'Update' }
);
const addButtonLabel = i18n.translate(
  'xpack.ingestPipelines.settingsFormOnFailureFlyout.addButtonLabel',
  { defaultMessage: 'Add' }
);

const cancelButtonLabel = i18n.translate(
  'xpack.ingestPipelines.settingsFormOnFailureFlyout.cancelButtonLabel',
  { defaultMessage: 'Cancel' }
);

// TODO rename file?
export const ProcessorSettings: FunctionComponent<Props> = memo(
  ({ processor, form }) => {
    return (
      <>
        <ProcessorTypeField initialType={processor?.type} />

        <EuiHorizontalRule />

        <FormDataProvider pathsToWatch="type">
          {(arg: any) => {
            const { type } = arg;

            if (type?.length) {
              const formDescriptor = getProcessorFormDescriptor(type as any);

              if (formDescriptor?.FieldsComponent) {
                return (
                  <>
                    <formDescriptor.FieldsComponent />
                    <CommonProcessorFields />
                  </>
                );
              }
              return <Custom defaultOptions={processor?.options} />;
            }

            // If the user has not yet defined a type, we do not show any settings fields
            return null;
          }}
        </FormDataProvider>
      </>
    );
  },
  (previous, current) => {
    return previous.processor === current.processor;
  }
);

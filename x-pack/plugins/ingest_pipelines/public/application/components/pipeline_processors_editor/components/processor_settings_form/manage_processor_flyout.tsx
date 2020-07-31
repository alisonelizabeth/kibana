/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { i18n } from '@kbn/i18n';
import { FormattedMessage } from '@kbn/i18n/react';
import React, { FunctionComponent, memo, useEffect, useState } from 'react';
import {
  EuiButton,
  EuiButtonEmpty,
  EuiHorizontalRule,
  EuiFlyout,
  EuiFlyoutHeader,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiSpacer,
  EuiTabs,
  EuiTab,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
} from '@elastic/eui';

import { Form, FormDataProvider, FormHook } from '../../../../../shared_imports';
import { ProcessorInternal } from '../../types';

import { getProcessorFormDescriptor } from './map_processor_type_to_form';
import { CommonProcessorFields, ProcessorTypeField } from './processors/common_fields';
import { Custom } from './processors/custom';

import { ProcessorSettings } from './processor_settings_form';
import { DocumentationButton } from './documentation_button';

export interface Props {
  isOnFailure: boolean;
  processor?: ProcessorInternal;
  form: FormHook;
  onClose: () => void;
  onOpen: () => void;
  esDocsBasePath: string;
}

const i18nTexts = {
  updateButtonLabel: i18n.translate(
    'xpack.ingestPipelines.manageProcessorFlyout.updateButtonLabel',
    { defaultMessage: 'Update' }
  ),
  cancelButtonLabel: i18n.translate(
    'xpack.ingestPipelines.manageProcessorFlyout.cancelButtonLabel',
    { defaultMessage: 'Cancel' }
  ),
};

export type TabType = 'configuration' | 'output';

interface Tab {
  id: TabType;
  name: string;
}

const tabs: Tab[] = [
  {
    id: 'configuration',
    name: i18n.translate('xpack.ingestPipelines.manageProcessorFlyout.configurationTabTitle', {
      defaultMessage: 'Configuration',
    }),
  },
  {
    id: 'output',
    name: i18n.translate('xpack.ingestPipelines.manageProcessorFlyout.outputTabTitle', {
      defaultMessage: 'Output',
    }),
  },
];

export const ManageProcessorFlyout: FunctionComponent<Props> = memo(
  ({ processor, form, isOnFailure, onClose, onOpen, esDocsBasePath }) => {
    const flyoutTitleContent = isOnFailure ? (
      <FormattedMessage
        id="xpack.ingestPipelines.manageProcessorFlyout.onFailureTitle"
        defaultMessage="Manage on-failure processor"
      />
    ) : (
      <FormattedMessage
        id="xpack.ingestPipelines.manageProcessorFlyout.title"
        defaultMessage="Manage processor"
      />
    );

    useEffect(
      () => {
        onOpen();
      },
      [] /* eslint-disable-line react-hooks/exhaustive-deps */
    );

    const [activeTab, setActiveTab] = useState<TabType>('configuration');

    let flyoutContent: React.ReactNode;

    if (activeTab === 'output') {
      flyoutContent = <div>output</div>;
    } else {
      flyoutContent = <ProcessorSettings form={form} processor={processor} />;
    }

    return (
      <Form data-test-subj="processorSettingsForm" form={form}>
        <EuiFlyout size="m" maxWidth={720} onClose={onClose}>
          <EuiFlyoutHeader>
            <EuiFlexGroup gutterSize="xs">
              <EuiFlexItem>
                <div>
                  <EuiTitle size="m">
                    <h2>{flyoutTitleContent}</h2>
                  </EuiTitle>
                </div>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <FormDataProvider pathsToWatch="type">
                  {({ type }) => {
                    const formDescriptor = getProcessorFormDescriptor(type as any);

                    if (formDescriptor) {
                      return (
                        <DocumentationButton
                          processorLabel={formDescriptor.label}
                          docLink={esDocsBasePath + formDescriptor.docLinkPath}
                        />
                      );
                    }
                    return null;
                  }}
                </FormDataProvider>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            <EuiTabs>
              {tabs.map((tab) => (
                <EuiTab
                  onClick={() => {
                    setActiveTab(tab.id);
                  }}
                  isSelected={tab.id === activeTab}
                  key={tab.id}
                  data-test-subj={`${tab.id}Tab`}
                >
                  {tab.name}
                </EuiTab>
              ))}
            </EuiTabs>

            <EuiSpacer />

            {flyoutContent}
          </EuiFlyoutBody>
          <EuiFlyoutFooter>
            <EuiFlexGroup justifyContent="flexEnd">
              <EuiFlexItem grow={false}>
                <EuiButtonEmpty onClick={onClose}>{i18nTexts.cancelButtonLabel}</EuiButtonEmpty>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButton fill data-test-subj="submitButton" onClick={form.submit}>
                  {i18nTexts.updateButtonLabel}
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlyoutFooter>
        </EuiFlyout>
      </Form>
    );
  },
  (previous, current) => {
    return previous.processor === current.processor;
  }
);

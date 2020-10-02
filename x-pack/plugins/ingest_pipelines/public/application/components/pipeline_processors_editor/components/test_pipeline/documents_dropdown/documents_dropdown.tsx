/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import { i18n } from '@kbn/i18n';
import React, { FunctionComponent, useState } from 'react';
import {
  EuiPopover,
  EuiPopoverFooter,
  EuiButtonEmpty,
  EuiPopoverTitle,
  EuiSelectable,
  EuiTourStep,
  EuiButton,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';

import { Document } from '../../../types';

import { TestPipelineFlyoutTab } from '../test_pipeline_tabs';

import './documents_dropdown.scss';
import { useTourContext } from '../../../context';

const i18nTexts = {
  dropdownLabel: i18n.translate(
    'xpack.ingestPipelines.pipelineEditor.testPipeline.documentsdropdown.dropdownLabel',
    {
      defaultMessage: 'Documents:',
    }
  ),
  addDocumentsButtonLabel: i18n.translate(
    'xpack.ingestPipelines.pipelineEditor.testPipeline.documentsDropdown.editDocumentsButtonLabel',
    {
      defaultMessage: 'Edit documents',
    }
  ),
  popoverTitle: i18n.translate(
    'xpack.ingestPipelines.pipelineEditor.testPipeline.documentsDropdown.popoverTitle',
    {
      defaultMessage: 'Test documents',
    }
  ),
};

interface Props {
  documents: Document[];
  selectedDocumentIndex: number;
  updateSelectedDocument: (index: number) => void;
  openFlyout: (activeFlyoutTab: TestPipelineFlyoutTab) => void;
}

export const DocumentsDropdown: FunctionComponent<Props> = ({
  documents,
  selectedDocumentIndex,
  updateSelectedDocument,
  openFlyout,
}) => {
  const [showPopover, setShowPopover] = useState<boolean>(false);

  const { tourSteps, tourActions } = useTourContext();

  const [, euiTourStepTwo] = tourSteps;

  const managePipelineButton = (
    <EuiTourStep
      {...euiTourStepTwo}
      content={
        <div>
          <EuiText>
            <p>By default, you will see the results of the first document.</p>
            <p>Use the dropdown to change documents.</p>
          </EuiText>
          <EuiSpacer />
          <EuiButton color="primary" onClick={tourActions.incrementStep}>
            Ok, got it.
          </EuiButton>
        </div>
      }
    >
      <EuiButtonEmpty
        data-test-subj="documentsButton"
        onClick={() => setShowPopover((previousBool) => !previousBool)}
        iconType="arrowDown"
        iconSide="right"
      >
        {i18n.translate('xpack.ingestPipelines.pipelineEditor.testPipeline.selectedDocumentLabel', {
          defaultMessage: 'Document {selectedDocument}',
          values: {
            selectedDocument: selectedDocumentIndex + 1,
          },
        })}
      </EuiButtonEmpty>
    </EuiTourStep>
  );

  return (
    <EuiPopover
      isOpen={showPopover}
      closePopover={() => setShowPopover(false)}
      button={managePipelineButton}
      panelPaddingSize="none"
      withTitle
      repositionOnScroll
      data-test-subj="documentsDropdown"
      panelClassName="documentsDropdownPanel"
    >
      <EuiSelectable
        singleSelection
        data-test-subj="documentList"
        options={documents.map((doc, index) => ({
          key: index.toString(),
          'data-test-subj': 'documentListItem',
          checked: selectedDocumentIndex === index ? 'on' : undefined,
          label: i18n.translate('xpack.ingestPipelines.pipelineEditor.testPipeline.documentLabel', {
            defaultMessage: 'Document {documentNumber}',
            values: {
              documentNumber: index + 1,
            },
          }),
        }))}
        onChange={(newOptions) => {
          const selectedOption = newOptions.find((option) => option.checked === 'on');
          if (selectedOption) {
            updateSelectedDocument(Number(selectedOption.key!));
          }

          setShowPopover(false);
        }}
      >
        {(list) => (
          <>
            <EuiPopoverTitle>{i18nTexts.popoverTitle}</EuiPopoverTitle>
            {list}
          </>
        )}
      </EuiSelectable>

      <EuiPopoverFooter>
        <EuiButton
          size="s"
          fullWidth
          onClick={() => {
            openFlyout('documents');
            setShowPopover(false);
          }}
          data-test-subj="editDocumentsButton"
        >
          {i18nTexts.addDocumentsButtonLabel}
        </EuiButton>
      </EuiPopoverFooter>
    </EuiPopover>
  );
};

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { FormattedMessage } from '@kbn/i18n/react';
import {
  EuiPageBody,
  EuiPageContent,
  EuiSpacer,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
} from '@elastic/eui';

import { BASE_PATH } from '../../../../common/constants';
import { Pipeline } from '../../../../common/types';
import { useKibana } from '../../../shared_imports';
import { PipelineBuildTab } from './pipeline_build';
import { PipelineDebugTab } from './pipeline_debug';
import { Tabs } from './tabs';

interface Props {
  onSave: (pipeline: Pipeline) => void;
  onCancel: () => void;
  isSaving: boolean;
  saveError: any;
  defaultValue?: Pipeline;
  isEditing?: boolean;
}

export const PipelineForm: React.FunctionComponent<Props> = ({
  defaultValue = {
    name: '',
    description: '',
    processors: '',
    on_failure: '',
    version: '',
  },
  onSave,
  isSaving,
  saveError,
  isEditing,
  onCancel,
}) => {
  const [section, setSection] = useState<'build' | 'debug'>('build');
  const tabDataGetters = useRef<Record<string, any>>({});
  // want to keep track of the pipeline and the documents
  const pipeline = useRef(defaultValue);

  const setTabDataGetter = useCallback(
    (tabDataGetter: any) => {
      tabDataGetters.current[section] = tabDataGetter;
    },
    [section]
  );

  const validateAndGetDataFromTab = async (tab: string) => {
    const validateAndGetStepData = tabDataGetters.current[tab];

    if (!validateAndGetStepData) {
      throw new Error(`No data getter has been set for step "${tab}"`);
    }

    const { isValid, data } = await validateAndGetStepData();

    if (isValid) {
      // Update the pipeline object with the current data
      pipeline.current = { ...data };
    }

    return { isValid, data };
  };

  return (
    <>
      <Tabs
        onTabChange={async selectedTab => {
          const prevTab = selectedTab === 'build' ? 'debug' : 'build';
          const { isValid } = await validateAndGetDataFromTab(prevTab);

          if (isValid) {
            setSection(selectedTab);
          }
        }}
        selectedTab={section}
      />

      <EuiSpacer size="l" />

      {section === 'build' ? (
        <PipelineBuildTab
          onSave={onSave}
          onCancel={onCancel}
          isSaving={isSaving}
          saveError={saveError}
          setDataGetter={setTabDataGetter}
          isEditing={isEditing}
        />
      ) : (
        <PipelineDebugTab pipeline={pipeline.current} />
      )}
    </>
  );
};

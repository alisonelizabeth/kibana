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
import { PipelineForm, Tabs } from '../../components';

export const PipelinesCreate: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const { services } = useKibana();

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<any>(null);
  const [section, setSection] = useState<'build' | 'debug'>('build');
  const stepsDataGetters = useRef<Record<string, any>>({});

  const onSave = async (pipeline: Pipeline) => {
    setIsSaving(true);
    setSaveError(null);

    const { error } = await services.api.createPipeline(pipeline);

    setIsSaving(false);

    if (error) {
      setSaveError(error);
      return;
    }

    history.push(BASE_PATH);
  };

  const onCancel = () => {
    history.push(BASE_PATH);
  };

  useEffect(() => {
    services.breadcrumbs.setBreadcrumbs('create');
  }, [services]);

  const setStepDataGetter = useCallback(
    (stepDataGetter: any) => {
      stepsDataGetters.current[section] = stepDataGetter;
    },
    [section]
  );

  return (
    <EuiPageBody>
      <EuiPageContent>
        <EuiTitle size="l">
          <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiTitle size="l" data-test-subj="remoteClusterPageTitle">
                <h1 data-test-subj="pageTitle">
                  <FormattedMessage
                    id="xpack.ingestPipelines.create.pageTitle"
                    defaultMessage="Create pipeline"
                  />
                </h1>
              </EuiTitle>
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
              <EuiButtonEmpty
                size="s"
                flush="right"
                href={services.documentation.getPutPipelineApiUrl()}
                target="_blank"
                iconType="help"
              >
                <FormattedMessage
                  id="xpack.ingestPipelines.create.docsButtonLabel"
                  defaultMessage="Create pipeline docs"
                />
              </EuiButtonEmpty>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiTitle>

        <Tabs
          onTabChange={async tab => {
            // want data from the previous tab
            // const prevTab = tab === 'build' ? 'debug' : 'build';
            // const getFormData = stepsDataGetters.current[prevTab];
            // console.log(await getFormData());
            setSection(tab);
          }}
          selectedTab={section}
        />

        <EuiSpacer size="l" />

        {section === 'build' ? (
          <PipelineForm
            onSave={onSave}
            onCancel={onCancel}
            isSaving={isSaving}
            saveError={saveError}
            setDataGetter={setStepDataGetter}
          />
        ) : (
          <div>debug mode</div>
        )}
      </EuiPageContent>
    </EuiPageBody>
  );
};

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { FormattedMessage } from '@kbn/i18n/react';

import { SectionLoading } from '../shared_imports';
import { useComponentTemplatesContext } from '../component_templates_context';
import { UIM_COMPONENT_TEMPLATE_LIST_LOAD } from '../constants';
import { EmptyPrompt } from './empty_prompt';
import { ComponentTable } from './table';
import { LoadError } from './error';
import { ComponentTemplatesDeleteModal } from './delete_modal';
import { ComponentTemplateDetailsFlyout } from './details_flyout';

interface MatchParams {
  componentTemplateName?: string;
}

export const ComponentTemplateList: React.FunctionComponent<RouteComponentProps<MatchParams>> = ({
  match: {
    params: { componentTemplateName },
  },
  history,
}) => {
  const { api, trackMetric, appBasePath } = useComponentTemplatesContext();

  const { data, isLoading, error, sendRequest } = api.useLoadComponentTemplates();

  const [componentTemplatesToDelete, setComponentTemplatesToDelete] = useState<string[]>([]);

  // Track component loaded
  useEffect(() => {
    trackMetric('loaded', UIM_COMPONENT_TEMPLATE_LIST_LOAD);
  }, [trackMetric]);

  const goToList = () => {
    return history.push(`${appBasePath}component_templates`);
  };

  if (data?.length === 0) {
    return <EmptyPrompt />;
  }

  let content: React.ReactNode;

  if (isLoading) {
    content = (
      <SectionLoading data-test-subj="sectionLoading">
        <FormattedMessage
          id="xpack.idxMgmt.home.componentTemplates.list.loadingMessage"
          defaultMessage="Loading component templates..."
        />
      </SectionLoading>
    );
  } else if (data?.length) {
    content = (
      <ComponentTable
        componentTemplates={data}
        onReloadClick={sendRequest}
        onDeleteClick={setComponentTemplatesToDelete}
      />
    );
  } else if (error) {
    content = <LoadError onReloadClick={sendRequest} />;
  }

  return (
    <div data-test-subj="componentTemplateList">
      {content}

      {/* delete modal */}
      {componentTemplatesToDelete?.length > 0 ? (
        <ComponentTemplatesDeleteModal
          callback={(deleteResponse) => {
            if (deleteResponse?.hasDeletedComponentTemplates) {
              // refetch the component templates
              sendRequest();
              // go back to list view (if deleted from details flyout)
              goToList();
            }
            setComponentTemplatesToDelete([]);
          }}
          componentTemplatesToDelete={componentTemplatesToDelete}
        />
      ) : null}

      {/* details flyout */}
      {componentTemplateName && (
        <ComponentTemplateDetailsFlyout
          onClose={goToList}
          onDeleteClick={setComponentTemplatesToDelete}
          componentTemplateName={componentTemplateName}
        />
      )}
    </div>
  );
};

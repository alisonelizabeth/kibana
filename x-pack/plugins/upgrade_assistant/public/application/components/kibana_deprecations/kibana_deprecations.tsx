/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useMemo, useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiPageBody,
  EuiPageHeader,
  EuiTabbedContent,
  EuiTabbedContentTab,
  EuiPageContent,
  EuiPageContentBody,
  EuiToolTip,
  EuiNotificationBadge,
} from '@elastic/eui';
import { i18n } from '@kbn/i18n';

import { DomainDeprecationDetails } from 'src/core/server/types';
import { useAppContext } from '../../app_context';
import { UpgradeAssistantTabProps, EsTabs, TelemetryState } from '../types';
import { DeprecationTabContent } from './deprecation_tab_content';
import { KibanaDeprecationsList } from './deprecations_list';

const i18nTexts = {
  pageTitle: i18n.translate('xpack.upgradeAssistant.kibanaDeprecations.pageTitle', {
    defaultMessage: 'Kibana',
  }),
  pageDescription: i18n.translate('xpack.upgradeAssistant.kibanaDeprecations.pageDescription', {
    defaultMessage: 'Some Kibana issues may require your attention. Resolve them before upgrading.',
  }),
  docLinkText: i18n.translate('xpack.upgradeAssistant.kibanaDeprecations.docLinkText', {
    defaultMessage: 'Documentation',
  }),
  deprecationLabel: i18n.translate('xpack.upgradeAssistant.kibanaDeprecations.deprecationLabel', {
    defaultMessage: 'Kibana',
  }),
};

export const KibanaDeprecationsContent = withRouter(({ history }: RouteComponentProps) => {
  const [telemetryState, setTelemetryState] = useState<TelemetryState>(TelemetryState.Complete);
  const [kibanaDeprecations, setKibanaDeprecations] = useState<
    DomainDeprecationDetails[] | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const { deprecations, breadcrumbs, getUrlForApp, docLinks } = useAppContext();

  useEffect(() => {
    breadcrumbs.setBreadcrumbs('kibanaDeprecations');
  }, [breadcrumbs]);

  useEffect(() => {
    async function getAllDeprecations() {
      setIsLoading(true);

      try {
        const response = await deprecations.getAllDeprecations();
        setKibanaDeprecations(response);
      } catch (e) {
        setError(e);
      }

      setIsLoading(false);
    }

    getAllDeprecations();
  }, [deprecations]);

  // useEffect(() => {
  //   if (isLoading === false) {
  //     setTelemetryState(TelemetryState.Running);

  //     async function sendTelemetryData() {
  //       await api.sendTelemetryData({
  //         [tabName]: true,
  //       });
  //       setTelemetryState(TelemetryState.Complete);
  //     }

  //     sendTelemetryData();
  //   }
  // }, [api, tabName, isLoading]);

  return (
    <EuiPageBody>
      <EuiPageContent>
        <EuiPageHeader
          pageTitle={i18nTexts.pageTitle}
          description={i18nTexts.pageDescription}
          rightSideItems={[
            <EuiButtonEmpty
              href={docLinks.links.upgradeAssistant}
              target="_blank"
              iconType="help"
              data-test-subj="documentationLink"
            >
              {i18nTexts.docLinkText}
            </EuiButtonEmpty>,
          ]}
        />

        <EuiPageContentBody>
          <KibanaDeprecationsList
            navigateToOverviewPage={() => history.push('/overview')}
            deprecations={kibanaDeprecations}
            checkupLabel={i18nTexts.deprecationLabel}
            error={error}
            isLoading={isLoading}
          />
        </EuiPageContentBody>
      </EuiPageContent>
    </EuiPageBody>
  );
});

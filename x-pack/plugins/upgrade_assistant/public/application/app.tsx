/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { I18nStart } from 'src/core/public';
import {
  EuiButtonEmpty,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
} from '@elastic/eui';
import { FormattedMessage } from '@kbn/i18n/react';
import { UpgradeAssistantTabs } from './components/tabs';
import { AppContextProvider, ContextValue, AppContext } from './app_context';

export interface AppDependencies extends ContextValue {
  i18n: I18nStart;
}

export const RootComponent = ({ i18n, ...contextValue }: AppDependencies) => {
  const { docLinks, kibanaVersionInfo } = contextValue;
  const { nextMajor } = kibanaVersionInfo;
  const { DOC_LINK_VERSION, ELASTIC_WEBSITE_URL } = docLinks;

  return (
    <i18n.Context>
      <EuiPageBody>
        <EuiPageContent>
          <EuiPageContentHeader>
            <EuiPageContentHeaderSection>
              <EuiTitle size="l">
                <h1>
                  <FormattedMessage
                    id="xpack.upgradeAssistant.appTitle"
                    defaultMessage="{version} Upgrade Assistant"
                    values={{ version: `${nextMajor}.0` }}
                  />
                </h1>
              </EuiTitle>
            </EuiPageContentHeaderSection>
            <EuiPageContentHeaderSection>
              <EuiButtonEmpty
                href={`${ELASTIC_WEBSITE_URL}guide/en/kibana/${DOC_LINK_VERSION}/upgrade-assistant.html`}
                target="_blank"
                iconType="help"
                data-test-subj="documentationLink"
              >
                <FormattedMessage
                  id="xpack.upgradeAssistant.upgradeAssistantDocsLinkText"
                  defaultMessage="Upgrade Assistant docs"
                />
              </EuiButtonEmpty>
            </EuiPageContentHeaderSection>
          </EuiPageContentHeader>
          <EuiPageContentBody>
            <AppContextProvider value={contextValue}>
              <AppContext.Consumer>
                {({ http }) => <UpgradeAssistantTabs http={http} />}
              </AppContext.Consumer>
            </AppContextProvider>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </i18n.Context>
  );
};

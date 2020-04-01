/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { i18n } from '@kbn/i18n';
import { CoreSetup, Plugin } from 'src/core/public';
import { UsageCollectionSetup } from 'src/plugins/usage_collection/public';
import { ManagementSetup } from 'src/plugins/management/public';

import { PLUGIN_ID } from '../common';
import { httpService, documentationService, uiMetricService } from './application/services';

interface PluginDependencies {
  usageCollection: UsageCollectionSetup;
  management: ManagementSetup;
}

export class IngestPipelinesPlugin implements Plugin {
  public setup(coreSetup: CoreSetup, plugins: PluginDependencies): void {
    const { management, usageCollection } = plugins;
    const { http, getStartServices } = coreSetup;

    // Initialize services
    httpService.setup(http);
    uiMetricService.setup(usageCollection);

    management.sections.getSection('elasticsearch')!.registerApp({
      id: PLUGIN_ID,
      title: i18n.translate('xpack.ingestPipelines.appTitle', {
        defaultMessage: 'Ingest Pipelines',
      }),
      mount: async ({ element, setBreadcrumbs }) => {
        const [coreStart] = await getStartServices();
        const { docLinks } = coreStart;

        documentationService.setup(docLinks);

        setBreadcrumbs([
          {
            text: i18n.translate('xpack.ingestPipelines.breadcrumbsTitle', {
              defaultMessage: 'Ingest Pipelines',
            }),
          },
        ]);

        const { renderApp } = await import('./application');
        return renderApp(coreStart, { element, setBreadcrumbs });
      },
    });
  }

  public start() {}

  public stop() {}
}

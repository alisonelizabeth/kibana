/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import { i18n } from '@kbn/i18n';
import { BASE_PATH } from '../../../common/constants';
import { ManagementAppMountParams } from '../../../../../../src/plugins/management/public';

type SetBreadcrumbs = ManagementAppMountParams['setBreadcrumbs'];

export class BreadcrumbService {
  private breadcrumbs: {
    [key: string]: Array<{
      text: string;
      href?: string;
    }>;
  } = {
    home: [],
  };
  private setBreadcrumbsHandler?: SetBreadcrumbs;

  public setup(setBreadcrumbsHandler: SetBreadcrumbs): void {
    const homeBreadcrumbText = i18n.translate('xpack.ingestPipelines.breadcrumb.pipelinesLabel', {
      defaultMessage: 'Ingest Pipelines',
    });

    this.setBreadcrumbsHandler = setBreadcrumbsHandler;

    this.breadcrumbs.home = [
      {
        text: homeBreadcrumbText,
      },
    ];

    this.breadcrumbs.create = [
      {
        text: homeBreadcrumbText,
        href: `#${BASE_PATH}`,
      },
      {
        text: i18n.translate('xpack.ingestPipelines.breadcrumb.createPipelineLabel', {
          defaultMessage: 'Create pipeline',
        }),
      },
    ];

    this.breadcrumbs.edit = [
      {
        text: homeBreadcrumbText,
        href: `#${BASE_PATH}`,
      },
      {
        text: i18n.translate('xpack.ingestPipelines.breadcrumb.editPipelineLabel', {
          defaultMessage: 'Edit pipeline',
        }),
      },
    ];
  }

  public setBreadcrumbs(type: 'create' | 'home' | 'edit'): void {
    if (!this.setBreadcrumbsHandler) {
      throw new Error('Breadcrumb service has not been initialized');
    }

    const newBreadcrumbs = this.breadcrumbs[type]
      ? [...this.breadcrumbs[type]]
      : [...this.breadcrumbs.home];

    this.setBreadcrumbsHandler(newBreadcrumbs);
  }
}

export const breadcrumbService = new BreadcrumbService();

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { i18n } from '@kbn/i18n';
import { find } from 'lodash';
import { uiRoutes } from '../../../angular/helpers/routes';
import { routeInitProvider } from '../../../lib/route_init';
import { MonitoringViewBaseEuiTableController } from '../../';
import { ElasticsearchIndices } from '../../../components';
import template from './index.html';
import {
  CODE_PATH_ELASTICSEARCH,
  ELASTICSEARCH_SYSTEM_ID,
  RULE_LARGE_SHARD_SIZE,
} from '../../../../common/constants';
import { SetupModeRenderer } from '../../../components/renderers';
import { SetupModeContext } from '../../../components/setup_mode/setup_mode_context';

uiRoutes.when('/elasticsearch/indices', {
  template,
  resolve: {
    clusters(Private) {
      const routeInit = Private(routeInitProvider);
      return routeInit({ codePaths: [CODE_PATH_ELASTICSEARCH] });
    },
  },
  controllerAs: 'elasticsearchIndices',
  controller: class ElasticsearchIndicesController extends MonitoringViewBaseEuiTableController {
    constructor($injector, $scope) {
      const $route = $injector.get('$route');
      const globalState = $injector.get('globalState');
      const features = $injector.get('features');

      const { cluster_uuid: clusterUuid } = globalState;
      $scope.cluster = find($route.current.locals.clusters, { cluster_uuid: clusterUuid });

      let showSystemIndices = features.isEnabled('showSystemIndices', false);

      super({
        title: i18n.translate('xpack.monitoring.elasticsearch.indices.routeTitle', {
          defaultMessage: 'Elasticsearch - Indices',
        }),
        pageTitle: i18n.translate('xpack.monitoring.elasticsearch.indices.pageTitle', {
          defaultMessage: 'Elasticsearch indices',
        }),
        storageKey: 'elasticsearch.indices',
        apiUrlFn: () =>
          `../api/monitoring/v1/clusters/${clusterUuid}/elasticsearch/indices?show_system_indices=${showSystemIndices}`,
        reactNodeId: 'elasticsearchIndicesReact',
        defaultData: {},
        $scope,
        $injector,
        $scope,
        $injector,
        alerts: {
          shouldFetch: true,
          options: {
            alertTypeIds: [RULE_LARGE_SHARD_SIZE],
          },
        },
      });

      this.isCcrEnabled = $scope.cluster.isCcrEnabled;

      // for binding
      const toggleShowSystemIndices = (isChecked) => {
        // flip the boolean
        showSystemIndices = isChecked;
        // preserve setting in localStorage
        features.update('showSystemIndices', isChecked);
        // update the page (resets pagination and sorting)
        this.updateData();
      };

      const renderComponent = () => {
        const { clusterStatus, indices } = this.data;
        this.renderReact(
          <SetupModeRenderer
            scope={$scope}
            injector={$injector}
            productName={ELASTICSEARCH_SYSTEM_ID}
            render={({ flyoutComponent, bottomBarComponent }) => (
              <SetupModeContext.Provider value={{ setupModeSupported: true }}>
                {flyoutComponent}
                <ElasticsearchIndices
                  clusterStatus={clusterStatus}
                  indices={indices}
                  alerts={this.alerts}
                  showSystemIndices={showSystemIndices}
                  toggleShowSystemIndices={toggleShowSystemIndices}
                  sorting={this.sorting}
                  pagination={this.pagination}
                  onTableChange={this.onTableChange}
                />
                {bottomBarComponent}
              </SetupModeContext.Provider>
            )}
          />
        );
      };

      this.onTableChangeRender = renderComponent;

      $scope.$watch(
        () => this.data,
        (data) => {
          if (!data) {
            return;
          }
          renderComponent();
        }
      );
    }
  },
});

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import fetch from 'node-fetch';

import { API_BASE_PATH } from '../../common/constants';
import { RouteDependencies } from '../types';

/**
 * For POC purposes, I am hard-coding the following values:
 *  - SNAPSHOT: The name of the snapshot to be created. This will likely remain hard-coded, but to be renamed more appropriately.
 *  - INDICES: The array of indices to back up. In the future, I'd expect a user would choose these values in the UI.
 *  - CLOUD_ES_ENDPOINT: The ES endpoint from the cloud deployment being used for testing.
 *  - CLOUD_ES_PASSWORD: The ES password from the cloud deployment being used for testing.
 *  - SHARED_S3_REPOSITORY: The ES repository name. This must be the same on cloud and on-prem.
 *  - SHARED_S3_CLIENT: The S3 client name of the shared repository.
 *  - SHARED_S3_BUCKET: The S3 bucket name of the shared repository.
 */
const SNAPSHOT = 'ecma_demo_snapshot';
const INDICES = ['kibana_sample_data_logs'];
const CLOUD_ES_ENDPOINT = '';
const CLOUD_ES_PASSWORD = '';
const SHARED_S3_REPOSITORY = 'ecma_repo';
const SHARED_S3_CLIENT = '';
const SHARED_S3_BUCKET = '';

/**
 * Assumptions/Pre-reqs:
 * 1. A cloud deployment is configured with a readonly S3 repository
 * 2. On-prem Kibana is configured with data (e.g., sample data logs)
 * 3. On-prem ES is configured with S3 credentials via ES keystore
 */

export const registerMigrateRoutes = ({
  router,
  lib: { handleEsError },
}: RouteDependencies): void => {
  router.post(
    {
      path: `${API_BASE_PATH}/migrate`,
      validate: false,
    },
    async (context, request, response) => {
      const { client: clusterClient } = context.core.elasticsearch;

      try {
        // 1. Create a repository on-prem
        await clusterClient.asCurrentUser.snapshot.createRepository({
          name: SHARED_S3_REPOSITORY,
          body: {
            type: 's3',
            settings: {
              bucket: SHARED_S3_BUCKET,
              client: SHARED_S3_CLIENT,
            },
          },
          verify: false,
        });

        // 2. Create a snapshot on-prem using the shared repository
        await clusterClient.asCurrentUser.snapshot.create({
          snapshot: SNAPSHOT,
          repository: SHARED_S3_REPOSITORY,
          include_global_state: true,
          indices: INDICES,
          feature_states: ['kibana'],
          wait_for_completion: true,
        });

        // 3. Restore the snapshot on the cloud cluster
        const restoreSnapshotAPI = `${CLOUD_ES_ENDPOINT}/_snapshot/${SHARED_S3_REPOSITORY}/${SNAPSHOT}/_restore`;

        const restoreOptions = {
          method: 'POST',
          headers: {
            Authorization: `Basic ${Buffer.from(`elastic:${CLOUD_ES_PASSWORD}`).toString(
              'base64'
            )}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            include_global_state: true,
            indices: INDICES,
            feature_states: ['kibana'],
          }),
        };

        await fetch(restoreSnapshotAPI, restoreOptions);

        return response.ok({
          body: 'ok', // TEMP; we'd ultimately return the URL to the new Kibana instance on cloud
        });
      } catch (error) {
        return handleEsError({ error, response });
      }
    }
  );
};

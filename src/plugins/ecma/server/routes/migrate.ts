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
 * - The ES endpoint from the cloud cluster being used for testing
 * - The ES repository name to be shared on the cloud and on-prem cluster
 * - The name of the snapshot to be created. This will likely remain hard-coded, but renamed more appropriately.
 * - The array of indices to back up. In the future, I'd expect a user would choose these values in the UI.
 */
const ES_ENDPOINT = ''; // TODO Cloud ES endpoint url
const REPOSITORY = 'ecma_repo';
const SNAPSHOT = 'ecma_snapshot';
const INDICES = ['kibana_sample_data_logs'];

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
        // 1. Create a snapshot (on-prem repository was created manually w/ same S3 bucket used on cloud deployment)
        const {
          body: { snapshot },
        } = await clusterClient.asCurrentUser.snapshot.create({
          snapshot: SNAPSHOT,
          repository: REPOSITORY,
          include_global_state: true,
          indices: INDICES,
          feature_states: ['kibana'],
          wait_for_completion: true,
        });

        // 2. Create the repository on the cloud cluster using the same name as the on-prem repository
        const createRepositoryAPI = `${ES_ENDPOINT}/_snapshot/${REPOSITORY}`;

        const repositoryOptions = {
          method: 'PUT',
          headers: {
            // TODO provide auth from cloud deployment
            Authorization: `Basic ${Buffer.from(`XX:XXXX`).toString('base64')}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            type: 's3',
            // TODO provide s3 settings from cloud deployment
            settings: {
              client: '',
              bucket: '',
            },
          }),
        };

        await fetch(createRepositoryAPI, repositoryOptions);

        // 3. Restore the snapshot on the cloud cluster
        const restoreSnapshotAPI = `${ES_ENDPOINT}/_snapshot/${REPOSITORY}/${SNAPSHOT}/_restore`;

        const restoreOptions = {
          method: 'POST',
          headers: {
            // TODO provide auth from cloud deployment
            Authorization: `Basic ${Buffer.from(`XX:XXXX`).toString('base64')}`,
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
          body: 'ok', // TEMP
        });
      } catch (error) {
        return handleEsError({ error, response });
      }
    }
  );
};

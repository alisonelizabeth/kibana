/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { API_BASE_PATH } from '../../../common';
import { RouteDependencies } from '../../types';

export const registerGetRoutes = ({ router, license }: RouteDependencies): void => {
  router.get(
    { path: API_BASE_PATH, validate: false },
    license.guardApiRoute(async (ctx, req, res) => {
      const { callAsCurrentUser } = ctx.core.elasticsearch.dataClient;
      const pipelines = await callAsCurrentUser('ingest.getPipeline');

      return res.ok({ body: pipelines });
    })
  );
};

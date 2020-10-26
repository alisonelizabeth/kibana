/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { ElasticsearchClient } from 'kibana/server';
import { UMElasticsearchQueryFn } from '../adapters';
import { IndexPatternsFetcher, FieldDescriptor } from '../../../../../../src/plugins/data/server';

export interface IndexPatternTitleAndFields {
  title: string;
  fields: FieldDescriptor[];
}

export const getUptimeIndexPattern: UMElasticsearchQueryFn<
  { esClient: ElasticsearchClient },
  IndexPatternTitleAndFields | undefined
> = async ({ esClient, dynamicSettings }) => {
  const indexPatternsFetcher = new IndexPatternsFetcher(esClient);

  // Since `getDynamicIndexPattern` is called in setup_request (and thus by every endpoint)
  // and since `getFieldsForWildcard` will throw if the specified indices don't exist,
  // we have to catch errors here to avoid all endpoints returning 500 for users without APM data
  // (would be a bad first time experience)
  try {
    const fields = await indexPatternsFetcher.getFieldsForWildcard({
      pattern: dynamicSettings.heartbeatIndices,
    });

    const indexPattern: IndexPatternTitleAndFields = {
      fields,
      title: dynamicSettings.heartbeatIndices,
    };

    return indexPattern;
  } catch (e) {
    const notExists = e.output?.statusCode === 404;
    if (notExists) {
      // eslint-disable-next-line no-console
      console.error(
        `Could not get dynamic index pattern because indices "${dynamicSettings.heartbeatIndices}" don't exist`
      );
      return;
    }

    // re-throw
    throw e;
  }
};

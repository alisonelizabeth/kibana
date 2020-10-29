/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { getRumPageLoadTransactionsProjection } from '../../projections/rum_page_load_transactions';
import { mergeProjection } from '../../projections/util/merge_projection';
import { Setup, SetupTimeRange } from '../helpers/setup_request';
import {
  TRANSACTION_DOM_INTERACTIVE,
  TRANSACTION_TIME_TO_FIRST_BYTE,
} from '../../../common/elasticsearch_fieldnames';

export async function getClientMetrics({
  setup,
  urlQuery,
  percentile = 50,
}: {
  setup: Setup & SetupTimeRange;
  urlQuery?: string;
  percentile?: number;
}) {
  const projection = getRumPageLoadTransactionsProjection({
    setup,
    urlQuery,
    checkFetchStartFieldExists: false,
  });

  const params = mergeProjection(projection, {
    body: {
      size: 0,
      track_total_hits: true,
      aggs: {
        hasFetchStartField: {
          filter: {
            exists: { field: 'transaction.marks.navigationTiming.fetchStart' },
          },
          aggs: {
            backEnd: {
              percentiles: {
                field: TRANSACTION_TIME_TO_FIRST_BYTE,
                percents: [percentile],
                hdr: {
                  number_of_significant_value_digits: 3,
                },
              },
            },
            domInteractive: {
              percentiles: {
                field: TRANSACTION_DOM_INTERACTIVE,
                percents: [percentile],
                hdr: {
                  number_of_significant_value_digits: 3,
                },
              },
            },
          },
        },
      },
    },
  });

  const { apmEventClient } = setup;
  const response = await apmEventClient.search(params);
  const {
    hasFetchStartField: { backEnd, domInteractive },
  } = response.aggregations!;

  const pkey = percentile.toFixed(1);

  // Divide by 1000 to convert ms into seconds
  return {
    pageViews: { value: response.hits.total.value ?? 0 },
    backEnd: { value: backEnd.values[pkey] || 0 },
    frontEnd: {
      value: (domInteractive.values[pkey] || 0) - (backEnd.values[pkey] || 0),
    },
  };
}

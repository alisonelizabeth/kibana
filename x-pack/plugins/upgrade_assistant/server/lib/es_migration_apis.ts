/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { IScopedClusterClient } from 'src/core/server';
import { indexSettingDeprecations } from '../../common/constants';
import {
  DeprecationAPIResponse,
  EnrichedDeprecationInfo,
  UpgradeAssistantStatus,
} from '../../common/types';

import { esIndicesStateCheck } from './es_indices_state_check';

export async function getUpgradeAssistantStatus(
  dataClient: IScopedClusterClient,
  isCloudEnabled: boolean
): Promise<UpgradeAssistantStatus> {
  const { body: deprecations } = await dataClient.asCurrentUser.migration.deprecations();

  const cluster = getClusterDeprecations(deprecations, isCloudEnabled);
  const indices = getCombinedIndexInfos(deprecations);

  const indexNames = indices.map(({ index }) => index!);

  // If we have found deprecation information for index/indices check whether the index is
  // open or closed.
  if (indexNames.length) {
    const indexStates = await esIndicesStateCheck(dataClient.asCurrentUser, indexNames);

    indices.forEach((indexData) => {
      indexData.blockerForReindexing =
        indexStates[indexData.index!] === 'closed' ? 'index-closed' : undefined;
    });
  }

  const criticalWarnings = cluster.concat(indices).filter((d) => d.level === 'critical');

  return {
    readyForUpgrade: false,
    cluster: [
      {
        level: 'warning',
        message: 'cluster deprecation',
        url: 'doc_url',
        details: 'foo',
      },
      {
        level: 'warning',
        message: 'cluster deprecation',
        url: 'doc_url',
        details: 'foo',
      },
      {
        level: 'critical',
        message: 'cluster deprecation1',
        url: 'doc_url',
        details: 'foobar',
      },
      {
        level: 'warning',
        message: 'cluster random',
        url: 'doc_url',
        details: 'foobar',
      },
    ],
    indices: [
      {
        level: 'warning',
        message: 'translog retention settings are ignored',
        url: 'doc_url',
        index: 'test1',
        deprecatedIndexSettings: ['refresh_interval'], // this isn't the actual deprecated setting, but since the correct ones are deprecated on 9.0 (master) we're testing the functionality against settings that exist
      },
      {
        level: 'critical',
        message: 'none level test',
        url: 'test/url',
        details: 'test details',
        index: 'test2',
        reindex: true,
      },
    ],
  };
}

// Reformats the index deprecations to an array of deprecation warnings extended with an index field.
const getCombinedIndexInfos = (deprecations: DeprecationAPIResponse) =>
  Object.keys(deprecations.index_settings).reduce((indexDeprecations, indexName) => {
    return indexDeprecations.concat(
      deprecations.index_settings[indexName].map(
        (d) =>
          ({
            ...d,
            index: indexName,
            reindex: /Index created before/.test(d.message),
            deprecatedIndexSettings: getIndexSettingDeprecations(d.message),
          } as EnrichedDeprecationInfo)
      )
    );
  }, [] as EnrichedDeprecationInfo[]);

const getClusterDeprecations = (deprecations: DeprecationAPIResponse, isCloudEnabled: boolean) => {
  const combined = deprecations.cluster_settings
    .concat(deprecations.ml_settings)
    .concat(deprecations.node_settings);

  if (isCloudEnabled) {
    // In Cloud, this is changed at upgrade time. Filter it out to improve upgrade UX.
    return combined.filter((d) => d.message !== 'Security realm settings structure changed');
  } else {
    return combined;
  }
};

const getIndexSettingDeprecations = (message: string) => {
  const indexDeprecation = Object.values(indexSettingDeprecations).find(
    ({ deprecationMessage }) => deprecationMessage === message
  );

  return indexDeprecation?.settings || [];
};

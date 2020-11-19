/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import expect from '@kbn/expect';
import { FtrProviderContext } from '../../ftr_provider_context';

export default function ({ getService }: FtrProviderContext) {
  const supertest = getService('supertest');

  describe('compression', () => {
    it(`uses compression when there isn't a referer`, async () => {
      await supertest
        .get('/app/kibana')
        .set('accept-encoding', 'gzip')
        .then((response) => {
          expect(response.header).to.have.property('content-encoding', 'gzip');
        });
    });

    it(`uses compression when there is a whitelisted referer`, async () => {
      await supertest
        .get('/app/kibana')
        .set('accept-encoding', 'gzip')
        .set('referer', 'https://some-host.com')
        .then((response) => {
          expect(response.header).to.have.property('content-encoding', 'gzip');
        });
    });

    it(`doesn't use compression when there is a non-whitelisted referer`, async () => {
      await supertest
        .get('/app/kibana')
        .set('accept-encoding', 'gzip')
        .set('referer', 'https://other.some-host.com')
        .then((response) => {
          expect(response.header).not.to.have.property('content-encoding');
        });
    });
  });
}

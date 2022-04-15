/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { CoreSetup, Plugin, IRouter } from 'kibana/server';

import { ApiRoutes } from './routes';
import { handleEsError } from './shared_imports';

export class ECMAPlugin implements Plugin<void, void, any, any> {
  private readonly apiRoutes: ApiRoutes;

  constructor() {
    this.apiRoutes = new ApiRoutes();
  }

  public setup({ http }: CoreSetup) {
    const router: IRouter = http.createRouter();

    this.apiRoutes.setup({
      router,
      lib: {
        handleEsError,
      },
    });
  }

  public start() {}

  public stop() {}
}

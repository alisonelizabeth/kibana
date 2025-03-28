/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { DeepPartial } from 'utility-types';
import { merge } from 'lodash';
import { BaseDataGenerator } from './base_data_generator';
import { EndpointActionData, ISOLATION_ACTIONS } from '../types';

interface EcsError {
  code: string;
  id: string;
  message: string;
  stack_trace: string;
  type: string;
}

interface EndpointActionFields {
  action_id: string;
  data: EndpointActionData;
}

interface ActionRequestFields {
  expiration: string;
  type: 'INPUT_ACTION';
  input_type: 'endpoint';
}

interface ActionResponseFields {
  completed_at: string;
  started_at: string;
}
export interface LogsEndpointAction {
  '@timestamp': string;
  agent: {
    id: string | string[];
  };
  EndpointAction: EndpointActionFields & ActionRequestFields;
  error?: EcsError;
  user: {
    id: string;
  };
}

export interface LogsEndpointActionResponse {
  '@timestamp': string;
  agent: {
    id: string | string[];
  };
  EndpointAction: EndpointActionFields & ActionResponseFields;
  error?: EcsError;
}

const ISOLATION_COMMANDS: ISOLATION_ACTIONS[] = ['isolate', 'unisolate'];

export class EndpointActionGenerator extends BaseDataGenerator {
  /** Generate a random endpoint Action request (isolate or unisolate) */
  generate(overrides: DeepPartial<LogsEndpointAction> = {}): LogsEndpointAction {
    const timeStamp = new Date(this.randomPastDate());
    return merge(
      {
        '@timestamp': timeStamp.toISOString(),
        agent: {
          id: [this.randomUUID()],
        },
        EndpointAction: {
          action_id: this.randomUUID(),
          expiration: this.randomFutureDate(timeStamp),
          type: 'INPUT_ACTION',
          input_type: 'endpoint',
          data: {
            command: this.randomIsolateCommand(),
            comment: this.randomString(15),
          },
        },
        error: undefined,
        user: {
          id: this.randomUser(),
        },
      },
      overrides
    );
  }

  generateIsolateAction(overrides: DeepPartial<LogsEndpointAction> = {}): LogsEndpointAction {
    return merge(this.generate({ EndpointAction: { data: { command: 'isolate' } } }), overrides);
  }

  generateUnIsolateAction(overrides: DeepPartial<LogsEndpointAction> = {}): LogsEndpointAction {
    return merge(this.generate({ EndpointAction: { data: { command: 'unisolate' } } }), overrides);
  }

  /** Generates an endpoint action response */
  generateResponse(
    overrides: DeepPartial<LogsEndpointActionResponse> = {}
  ): LogsEndpointActionResponse {
    const timeStamp = new Date();

    return merge(
      {
        '@timestamp': timeStamp.toISOString(),
        agent: {
          id: this.randomUUID(),
        },
        EndpointAction: {
          action_id: this.randomUUID(),
          completed_at: timeStamp.toISOString(),
          data: {
            command: this.randomIsolateCommand(),
            comment: '',
          },
          started_at: this.randomPastDate(),
        },
        error: undefined,
      },
      overrides
    );
  }

  randomFloat(): number {
    return this.random();
  }

  randomN(max: number): number {
    return super.randomN(max);
  }

  protected randomIsolateCommand() {
    return this.randomChoice(ISOLATION_COMMANDS);
  }
}

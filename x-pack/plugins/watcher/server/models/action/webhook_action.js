/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { BaseAction } from './base_action';
import { ACTION_TYPES, ERROR_CODES } from '../../../common/constants';
import { i18n } from '@kbn/i18n';

export class WebhookAction extends BaseAction {
  constructor(props, errors) {
    props.type = ACTION_TYPES.WEBHOOK;
    super(props, errors);

    this.method = props.method;
    this.host = props.host;
    this.port = props.port;
    this.path = props.path;
    this.body = props.body;
  }

  // To Kibana
  get downstreamJson() {
    const result = super.downstreamJson;
    Object.assign(result, {
      method: this.method,
      host: this.host,
      port: this.port,
      path: this.path,
      body: this.body,
    });
    return result;
  }

  // From Kibana
  static fromDownstreamJson(json) {
    const props = super.getPropsFromDownstreamJson(json);
    const { errors } = this.validateJson(json);

    Object.assign(props, {
      method: json.method,
      host: json.host,
      port: json.port,
      path: json.path,
      body: json.body,
    });

    const action = new WebhookAction(props, errors);
    return { action, errors };
  }

  // To Elasticsearch
  get upstreamJson() {
    const result = super.upstreamJson;

    const optionalFields = {};
    if (this.path) {
      optionalFields.path = this.path;
    }
    if (this.method) {
      optionalFields.method = this.method;
    }
    if (this.body) {
      optionalFields.body = this.body;
    }

    result[this.id] = {
      webhook: {
        host: this.host,
        port: this.port,
        ...optionalFields,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    };
    return result;
  }

  // From Elasticsearch
  static fromUpstreamJson(json) {
    const props = super.getPropsFromUpstreamJson(json);
    const { errors } = this.validateJson(json.actionJson);

    const optionalFields = {};

    if (json.actionJson.webhook.path) {
      optionalFields.path = json.actionJson.webhook.path;
    }
    if (json.actionJson.webhook.method) {
      optionalFields.method = json.actionJson.webhook.method;
    }
    if (json.actionJson.webhook.body) {
      optionalFields.body = json.actionJson.webhook.body;
    }

    Object.assign(props, {
      host: json.actionJson.webhook.host,
      port: json.actionJson.webhook.port,
      ...optionalFields,
    });

    const action = new WebhookAction(props, errors);
    return { action, errors };
  }

  static validateJson(json) {
    const errors = [];

    if (!json.webhook.host) { // TODO this is broken when called from the client
      errors.push({
        code: ERROR_CODES.ERR_PROP_MISSING,
        message: i18n.translate('xpack.watcher.models.loggingAction.actionJsonWebhookHostPropertyMissingBadRequestMessage', {
          defaultMessage: 'json argument must contain an {actionJsonWebhookHost} property',
          values: {
            actionJsonWebhookHost: 'actionJson.webhook.host'
          }
        }),
      });
      json.webhook = {};
    }

    if (!json.webhook.port) {
      errors.push({
        code: ERROR_CODES.ERR_PROP_MISSING,
        message: i18n.translate('xpack.watcher.models.loggingAction.actionJsonWebhookPortPropertyMissingBadRequestMessage', {
          defaultMessage: 'json argument must contain an {actionJsonWebhookPort} property',
          values: {
            actionJsonWebhookPort: 'actionJson.webhook.port'
          }
        }),
      });
    }

    return { errors: errors.length ? errors : null };
  }

}

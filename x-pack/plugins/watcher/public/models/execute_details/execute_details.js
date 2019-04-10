/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { TIME_UNITS } from '../../../common/constants';
import moment from 'moment';
import { i18n } from '@kbn/i18n';

const DEFAULT_VALUES = {
  TRIGGERED_TIME_VALUE: 0,
  TRIGGERED_TIME_UNIT: TIME_UNITS.MILLISECOND,
  SCHEDULED_TIME_VALUE: 0,
  SCHEDULED_TIME_UNIT: TIME_UNITS.SECOND,
  IGNORE_CONDITION: false,
};

export class ExecuteDetails {
  constructor(props = {}) {
    this.triggeredTimeValue = props.triggeredTimeValue || DEFAULT_VALUES.TRIGGERED_TIME_VALUE;
    this.triggeredTimeUnit = props.triggeredTimeUnit || DEFAULT_VALUES.TRIGGERED_TIME_UNIT;
    this.scheduledTimeValue = props.scheduledTimeValue || DEFAULT_VALUES.SCHEDULED_TIME_VALUE;
    this.scheduledTimeUnit = props.scheduledTimeUnit || DEFAULT_VALUES.SCHEDULED_TIME_UNIT;
    this.ignoreCondition = props.ignoreCondition || DEFAULT_VALUES.IGNORE_CONDITION;
    this.alternativeInput = props.alternativeInput;
    this.alternativeInputString = props.alternativeInputString || '';
    this.actionModes = props.actionModes;
    this.recordExecution = props.recordExecution;
  }

  validate() {
    const errors = {
      json: [],
    };
    if (this.alternativeInputString || this.alternativeInputString !== '') {
      try {
        const parsedJson = JSON.parse(this.alternativeInputString);
        if (parsedJson && typeof parsedJson !== 'object') {
          errors.json.push(i18n.translate(
            'xpack.watcher.sections.watchEdit.simulate.form.alternativeInputFieldError',
            {
              defaultMessage: 'Invalid JSON',
            }
          ));
        }
      } catch (e) {
        errors.json.push(i18n.translate(
          'xpack.watcher.sections.watchEdit.simulate.form.alternativeInputFieldError',
          {
            defaultMessage: 'Invalid JSON',
          }
        ));
      }
    }
    return errors;
  }

  formatTime(timeUnit, value) {
    let timeValue = moment();
    switch (timeUnit) {
      case TIME_UNITS.SECOND:
        timeValue = timeValue.add(value, 'seconds');
        break;
      case TIME_UNITS.MINUTE:
        timeValue = timeValue.add(value, 'minutes');
        break;
      case TIME_UNITS.HOUR:
        timeValue = timeValue.add(value, 'hours');
        break;
      case TIME_UNITS.MILLISECOND:
        timeValue = timeValue.add(value, 'milliseconds');
        break;
    }
    return timeValue.format();
  }

  get upstreamJson() {
    const hasTriggerTime = this.triggeredTimeValue !== '';
    const hasScheduleTime = this.scheduledTimeValue !== '';
    const triggeredTime = hasTriggerTime ? this.formatTime(this.triggeredTimeUnit, this.triggeredTimeValue) : undefined;
    const scheduledTime = hasScheduleTime ?  this.formatTime(this.scheduledTimeUnit, this.scheduledTimeValue) : undefined;
    return {
      triggerData: {
        triggeredTime,
        scheduledTime,
      },
      ignoreCondition: this.ignoreCondition,
      alternativeInput: this.alternativeInputString !== '' ? JSON.parse(this.alternativeInputString) : undefined,
      actionModes: this.actionModes,
      recordExecution: this.recordExecution,
    };
  }
}

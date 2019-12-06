/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';
import { i18n } from '@kbn/i18n';

import { getFieldConfig } from '../../../lib';
import { UseField, RangeField } from '../../../shared_imports';
import { EditFieldFormRow } from '../fields/edit_field';

interface Props {
  defaultToggleValue: boolean;
}

export const BoostParameter = ({ defaultToggleValue }: Props) => (
  <EditFieldFormRow
    title={
      <h3>
        {i18n.translate('xpack.idxMgmt.mappingsEditor.boostFieldTitle', {
          defaultMessage: 'Set boost level',
        })}
      </h3>
    }
    description={i18n.translate('xpack.idxMgmt.mappingsEditor.boostFieldDescription', {
      defaultMessage: 'Mapping field-level query time boosting.',
    })}
    toggleDefaultValue={defaultToggleValue}
  >
    {/* Boost level */}
    <UseField
      path="boost"
      config={getFieldConfig('boost')}
      component={RangeField}
      componentProps={{
        euiFieldProps: {
          min: 1,
          max: 20,
          showInput: true,
          fullWidth: true,
        },
      }}
    />
  </EditFieldFormRow>
);

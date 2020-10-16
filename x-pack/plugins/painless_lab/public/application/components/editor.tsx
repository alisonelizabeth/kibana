/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import React from 'react';
import { PainlessLang } from '@kbn/monaco';

import { CodeEditor } from '../../../../../../src/plugins/kibana_react/public';

interface Props {
  code: string;
  onChange: (code: string) => void;
}

export function Editor({ code, onChange }: Props) {
  return (
    <CodeEditor
      languageId={PainlessLang.ID}
      // 99% width allows the editor to resize horizontally. 100% prevents it from resizing.
      width="99%"
      height="100%"
      value={code}
      onChange={onChange}
      suggestionProvider={PainlessLang.getSuggestionProvider('painless_test')}
      options={{
        fontSize: 12,
        minimap: {
          enabled: false,
        },
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        wrappingIndent: 'indent',
        automaticLayout: true,
      }}
    />
  );
}

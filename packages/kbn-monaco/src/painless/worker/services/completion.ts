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

import {
  PainlessCompletionResult,
  PainlessCompletionItem,
  PainlessContext,
  PainlessCompletionKind,
  Field,
} from '../../types';

import {
  painlessTestContext,
  scoreContext,
  filterContext,
  booleanScriptFieldScriptFieldContext,
  dateScriptFieldContext,
  doubleScriptFieldScriptFieldContext,
  ipScriptFieldScriptFieldContext,
  longScriptFieldScriptFieldContext,
  processorConditionalContext,
  stringScriptFieldScriptFieldContext,
} from '../../autocomplete_definitions';

import { PainlessParser } from '../../antlr/PainlessParser';

import { getParser } from '../utils';

interface Suggestion extends PainlessCompletionItem {
  properties?: PainlessCompletionItem[];
  constructorDefinition?: PainlessCompletionItem;
}

const mapContextToData: { [key: string]: { suggestions: any[] } } = {
  painless_test: painlessTestContext,
  score: scoreContext,
  filter: filterContext,
  boolean_script_field_script_field: booleanScriptFieldScriptFieldContext,
  date_script_field: dateScriptFieldContext,
  double_script_field_script_field: doubleScriptFieldScriptFieldContext,
  ip_script_field_script_field: ipScriptFieldScriptFieldContext,
  long_script_field_script_field: longScriptFieldScriptFieldContext,
  processor_conditional: processorConditionalContext,
  string_script_field_script_field: stringScriptFieldScriptFieldContext,
};

export class PainlessCompletionService {
  suggestions: Suggestion[];
  parser: PainlessParser;

  constructor(private _painlessContext: PainlessContext, private _currentText: string) {
    this.suggestions = mapContextToData[this._painlessContext].suggestions;
    this.parser = getParser(this._currentText);
    // eslint-disable-next-line no-console
    console.log('currentText', this._currentText);
    // eslint-disable-next-line no-console
    console.log('source', this.parser.source());
  }

  getStaticSuggestions(): PainlessCompletionResult {
    const suggestions: PainlessCompletionItem[] = this.suggestions.map((suggestion) => {
      const { properties, ...rootSuggestion } = suggestion;
      return rootSuggestion;
    });

    return {
      isIncomplete: false,
      suggestions: [
        ...suggestions,
        {
          label: 'doc',
          kind: 'keyword',
          // TODO i18n
          documentation: `Access a field value from a script using the doc['field_name'] syntax`,
          insertText: "doc[${1:'my_field'}]",
          insertTextAsSnippet: true,
        },
      ],
    };
  }

  getPrimitives(): string[] {
    return this.suggestions
      .filter((suggestion) => suggestion.kind === 'type')
      .map((type) => type.label);
  }

  getPropertySuggestions(className: string): PainlessCompletionResult {
    const painlessClass = this.suggestions.find((suggestion) => suggestion.label === className);

    return {
      isIncomplete: false,
      suggestions: painlessClass?.properties || [],
    };
  }

  getFieldSuggestions(fields: Field[]): PainlessCompletionResult {
    const suggestions = fields.map(({ name }) => {
      return {
        label: name,
        kind: 'field' as PainlessCompletionKind,
        // TODO i18n
        documentation: `Retrieve the value for field ${name}`,
        insertText: `${name}'`,
      };
    });

    return {
      isIncomplete: false,
      suggestions,
    };
  }

  getConstructorSuggestions(): PainlessCompletionResult {
    let constructorSuggestions: PainlessCompletionItem[] = [];

    const suggestionsWithConstructors = this.suggestions.filter(
      (suggestion) => suggestion.constructorDefinition
    );

    if (suggestionsWithConstructors) {
      constructorSuggestions = suggestionsWithConstructors.map(
        (filteredSuggestion) => filteredSuggestion.constructorDefinition!
      );
    }

    return {
      isIncomplete: false,
      suggestions: constructorSuggestions,
    };
  }
}

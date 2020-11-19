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

import { monaco } from '../../monaco_imports';
import { PainlessCompletionResult, PainlessContext, Field } from '../types';

import { getAutocompleteSuggestions } from './lib';

import { parseAndGetSyntaxErrors } from './parser';
export class PainlessWorker {
  private _ctx: monaco.worker.IWorkerContext;

  constructor(ctx: monaco.worker.IWorkerContext) {
    this._ctx = ctx;
  }

  private getTextDocument(): string {
    const model = this._ctx.getMirrorModels()[0];
    return model.getValue();
  }

  public async getSyntaxErrors() {
    const code = this.getTextDocument();
    const syntaxErrors = parseAndGetSyntaxErrors(code);
    return syntaxErrors;
  }

  public provideAutocompleteSuggestions(
    currentLineChars: string,
    context: PainlessContext,
    fields?: Field[]
  ): PainlessCompletionResult {
    // Array of the active line words, e.g., [boolean, isTrue, =, true]
    const words = currentLineChars.replace('\t', '').split(' ');
    const code = this.getTextDocument();

    const autocompleteSuggestions: PainlessCompletionResult = getAutocompleteSuggestions(
      context,
      words,
      code,
      fields
    );

    return autocompleteSuggestions;
  }
}

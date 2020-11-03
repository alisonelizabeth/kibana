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
const {
  getPrimitives,
  getMethodDescription,
  getPainlessClassToAutocomplete,
  createAutocompleteDefinitions,
} = require('./create_autocomplete_definitions');

// Snippet of sample data returned from GET _scripts/painless/_context?context=<context>
const testContext = [
  {
    name: 'boolean',
    imported: true,
    constructors: [],
    static_methods: [],
    methods: [],
    static_fields: [],
    fields: [],
  },
  {
    name: 'int',
    imported: true,
    constructors: [],
    static_methods: [],
    methods: [],
    static_fields: [],
    fields: [],
  },
  {
    name: 'java.lang.Math',
    imported: true,
    constructors: [],
    static_methods: [
      {
        declaring: 'java.lang.Math',
        name: 'pow',
        return: 'double',
        parameters: ['double', 'double'],
      },
      {
        declaring: 'java.lang.Math',
        name: 'random',
        return: 'double',
        parameters: [],
      },
    ],
    methods: [
      {
        declaring: 'java.lang.Object',
        name: 'toString',
        return: 'java.lang.String',
        parameters: [],
      },
    ],
    static_fields: [
      {
        declaring: 'java.lang.Math',
        name: 'PI',
        type: 'double',
      },
    ],
    fields: [],
  },
];

describe('Autocomplete utils', () => {
  describe('getPrimitives()', () => {
    test('returns an array of primitives', () => {
      expect(getPrimitives(testContext)).toEqual(['boolean', 'int']);
    });
  });

  describe('getMethodDescription()', () => {
    test('returns a string describing the method', () => {
      expect(getMethodDescription('pow', ['double', 'double'], 'double')).toEqual(
        'pow(double a, double b): double'
      );
    });
    test('represents each parameter as an alphabetical character', () => {
      expect(
        getMethodDescription(
          'myMethod',
          ['string', 'string', 'string', 'string', 'string'],
          'string'
        )
      ).toEqual('myMethod(string a, string b, string c, string d, string e): string');
    });
  });

  describe('getPainlessClassToAutocomplete()', () => {
    test('returns the fields and methods associated with a class', () => {
      const mathClass = testContext[2];

      const {
        static_fields: staticFields,
        fields,
        static_methods: staticMethods,
        methods,
      } = mathClass;

      expect(
        getPainlessClassToAutocomplete({
          staticFields,
          fields,
          staticMethods,
          methods,
        })
      ).toEqual([
        {
          documentation: 'PI: double',
          insertText: 'PI',
          kind: 'property',
          label: 'PI',
        },
        {
          documentation: 'pow(double a, double b): double',
          insertText: 'pow',
          kind: 'method',
          label: 'pow',
        },
        {
          documentation: 'random(): double',
          insertText: 'random',
          kind: 'method',
          label: 'random',
        },
        {
          documentation: 'toString(): java.lang.String',
          insertText: 'toString',
          kind: 'method',
          label: 'toString',
        },
      ]);
    });
  });

  describe('createAutocompleteDefinitions()', () => {
    test('returns formatted autocomplete definitions', () => {
      expect(createAutocompleteDefinitions(testContext)).toEqual([
        {
          properties: undefined,
          constructorDefinition: undefined,
          documentation: 'Primitive: boolean',
          insertText: 'boolean',
          kind: 'type',
          label: 'boolean',
        },
        {
          properties: undefined,
          constructorDefinition: undefined,
          documentation: 'Primitive: int',
          insertText: 'int',
          kind: 'type',
          label: 'int',
        },
        {
          properties: [
            {
              documentation: 'PI: double',
              insertText: 'PI',
              kind: 'property',
              label: 'PI',
            },
            {
              documentation: 'pow(double a, double b): double',
              insertText: 'pow',
              kind: 'method',
              label: 'pow',
            },
            {
              documentation: 'random(): double',
              insertText: 'random',
              kind: 'method',
              label: 'random',
            },
            {
              documentation: 'toString(): java.lang.String',
              insertText: 'toString',
              kind: 'method',
              label: 'toString',
            },
          ],
          constructorDefinition: undefined,
          documentation: 'Class: Math',
          insertText: 'Math',
          kind: 'class',
          label: 'Math',
        },
      ]);
    });

    test('returns a constructor definition', () => {
      const contextWithConstructors = [
        {
          name: 'java.lang.ArithmeticException',
          imported: true,
          constructors: [
            {
              declaring: 'java.lang.ArithmeticException',
              parameters: [],
            },
            {
              declaring: 'java.lang.ArithmeticException',
              parameters: ['java.lang.String'],
            },
          ],
          static_methods: [],
          methods: [
            {
              declaring: 'java.lang.Object',
              name: 'equals',
              return: 'boolean',
              parameters: ['java.lang.Object'],
            },
          ],
          static_fields: [],
          fields: [],
        },
      ];

      expect(createAutocompleteDefinitions(contextWithConstructors)).toEqual([
        {
          constructorDefinition: {
            documentation: 'Constructor: ArithmeticException',
            insertText: 'ArithmeticException',
            kind: 'constructor',
            label: 'ArithmeticException',
          },
          documentation: 'Class: ArithmeticException',
          insertText: 'ArithmeticException',
          kind: 'class',
          label: 'ArithmeticException',
          properties: [
            {
              documentation: 'equals(java.lang.Object a): boolean',
              insertText: 'equals',
              kind: 'method',
              label: 'equals',
            },
          ],
        },
      ]);
    });
  });
});

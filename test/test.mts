import { test } from 'node:test';

import { format } from 'prettier';

import * as plugin from '../src/index.mts';

const formater = async (input: string) => {
  return format(input.trim(), {
    parser: 'yaml-spacing',
    plugins: [plugin],
    filepath: 'test.yaml',
  });
};

test('empty', async (t) => {
  const input = '';
  const formatted = await formater(input);
  t.assert.snapshot(formatted);
});

test('empty', async (t) => {
  const input = '"456464646"';
  const formatted = await formater(input);
  t.assert.snapshot(formatted);
});

test('between array items', async (t) => {
  const input = `
- item1 # 6
- item2 #5




- item3
`;
  const formatted = await formater(input);
  t.assert.snapshot(formatted);
});

test('between object items', async (t) => {
  const input = `
foo: bar
bar:       baz

abc: 456
`;
  const formatted = await formater(input);
  t.assert.snapshot(formatted);
});

test('between object nested', async (t) => {
  const input1 = `
foo: bar
bar: baz
abc:
  foo      : bar
  bar: baz
efg:
  - item1
  - item2
  - foo: bar
    bar: baz
`;
  const formatted1 = await formater(input1);
  t.assert.snapshot(formatted1);

  const input2 = `
- item1
- item2
- - item1
  - item2
- foo: bar
  bar: baz
  abc:
    - item1
    - item2
`;

  const formatted2 = await formater(input2);
  t.assert.snapshot(formatted2);
});

test('like json', async (t) => {
  const input = `
[
  "item1",
  "item2",
  [
    "item1",
    "2"
  ],
  {
    "foo": "bar",
    "bar": "baz",
    "abc": [
      "item-1",
      "item-2"
    ]
  }
]
`;
  const formatted = await formater(input);
  t.assert.snapshot(formatted);
});

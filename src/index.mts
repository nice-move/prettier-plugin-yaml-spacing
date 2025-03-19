import { parseDocument } from 'yaml';
import type { Document } from 'yaml';

import { ast2String, transformAst } from './lib.mts';
import type { PrintOptions } from './lib.mts';

export const languages = [
  {
    name: 'yaml',
    parsers: ['yaml-spacing'],
    aceMode: 'text',
    extensions: ['.yaml', '.yml'],
    tmScope: 'source.yaml',
    vscodeLanguageIds: ['yaml'],
  },
];

export const parsers = {
  'yaml-spacing': {
    parse: (text: string) => parseDocument(text),
    astFormat: 'yaml-spacing-ast',
    locStart: () => 0,
    locEnd: () => 0,
  },
};

export const printers = {
  'yaml-spacing-ast': {
    preprocess: (ast: Document) => transformAst(ast),
    print: (path: { getValue: () => Document }, options: PrintOptions) => {
      const ast = path.getValue();

      return ast2String(ast, options);
    },
  },
};

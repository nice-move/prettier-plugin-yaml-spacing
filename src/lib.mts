/* eslint-disable no-use-before-define */
import { isMap, isSeq, Pair, YAMLMap, YAMLSeq } from 'yaml';
import type { Document, Scalar } from 'yaml';

type Obj = {
  key: Scalar;
  value:
    | Scalar
    | (Pair & { spaceBefore: boolean; type: 'QUOTE_DOUBLE' | 'PLAIN' })
    | YAMLMap
    | YAMLSeq;
};

function addPadding(node: Node, haveParent = false) {
  if (isMap(node)) {
    node.flow = false;
    addPaddingToMap(node, haveParent);
  } else if (isSeq(node)) {
    node.flow = false;
    addPaddingToSeq(node, haveParent);
  }
}

function addPaddingToMap(node: YAMLMap, haveParent = false) {
  const items = node.items as Obj[];

  for (const [index, item] of Object.entries(items)) {
    item.key.spaceBefore = haveParent || Number(index) > 0;

    if ('type' in item.key) {
      delete item.key.type;
    }

    if ('type' in item.value) {
      delete item.value.type;
    }

    addPadding(item.value, true);
  }
}

function addPaddingToSeq(node: YAMLSeq, haveParent = false) {
  const items = node.items as Obj['value'][];

  for (const [index, item] of Object.entries(items)) {
    item.spaceBefore = haveParent || Number(index) > 0;

    if ('type' in item) {
      delete item.type;
    }

    addPadding(item);
  }
}

type Node = YAMLMap | YAMLSeq | unknown;

export function transformAst(ast: Document) {
  if (ast.contents) {
    addPadding(ast.contents);
  }

  return ast;
}

type EOL = 'auto' | 'lf' | 'crlf' | 'cr';

export interface PrintOptions {
  lineWidth?: number;
  tabWidth?: number;
  singleQuote?: boolean;
  endOfLine?: EOL;
  bracketSpacing?: boolean;
}

const eolMap: Record<EOL, string> = {
  crlf: '\r\n',
  cr: '\r',
  lf: '\n',
  auto: '\n',
};

export function ast2String(ast: Document, options: PrintOptions) {
  const {
    lineWidth = 80,
    tabWidth = 2,
    singleQuote = false,
    endOfLine = 'lf',
    bracketSpacing = true,
  } = options;

  const formattedString = ast
    .toString({
      lineWidth,
      indent: tabWidth,
      singleQuote,
      defaultKeyType: 'PLAIN',
      flowCollectionPadding: bracketSpacing,
      commentString: (comment: string) => `# ${comment.trim()}`,
    })
    .trim();

  return formattedString.replaceAll(/\r?\n/g, eolMap[endOfLine]);
}

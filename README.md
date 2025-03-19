# prettier-plugin-yaml-spacing

A [prettier] plugin that adds padding between array and object items in YAML files.

[prettier]: https://prettier.io/

<img src="https://cdn.worldvectorlogo.com/logos/prettier-2.svg" alt="logo" height="80" align="right">

[![npm][npm-badge]][npm-url]
[![github][github-badge]][github-url]
![node][node-badge]

[npm-url]: https://www.npmjs.com/package/prettier-plugin-yaml-spacing
[npm-badge]: https://img.shields.io/npm/v/prettier-plugin-yaml-spacing.svg?style=flat-square&logo=npm
[github-url]: https://github.com/nice-move/prettier-plugin-yaml-spacing
[github-badge]: https://img.shields.io/npm/l/prettier-plugin-yaml-spacing.svg?style=flat-square&colorB=blue&logo=github
[node-badge]: https://img.shields.io/node/v/prettier-plugin-yaml-spacing.svg?style=flat-square&colorB=green&logo=node.js

## Installation

```bash
npm install prettier-plugin-yaml-spacing --save-dev
```

## Usage

```jsonc
// .prettierrc.json
{
  "overrides": [
    {
      "files": ["*.copywrite.yaml", "*.copywrite.yml"],
      "options": {
        "parser": "yaml-spacing"
      }
    }
  ]
}
```

```sh
prettier --write *.yaml *.yml
```

## Related

- [@nice-move/prettier-config](https://github.com/nice-move/nice-move/tree/master/packages/prettier-config)
- [@nice-move/prettier-plugin-package-json](https://github.com/nice-move/prettier-plugin-package-json)
- [@nice-move/prettier-plugin-ssh-config](https://github.com/nice-move/prettier-plugin-ssh-config)
- [@nice-move/prettier-plugin-groovy](https://github.com/nice-move/prettier-plugin-groovy)

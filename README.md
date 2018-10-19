# Introduction

Example and tests for using [warped-components](https://github.com/wearereasonablepeople/warped-components) and [warped-reducers](https://github.com/wearereasonablepeople/warped-reducers) with TypeScript.

## Setup

I'm using an [Alle](https://github.com/boennemann/alle)-based setup to have faster feedback on changes while working with both libraries above:

```
├── warped-ts-example
└── node_modules
    ├── warped-components
    └── warped-reducers
```

While avoiding installing them in this repo's `package.json`.

### MJS resolution
By enabling a resolver for the `.mjs` extension we can use the libraries without going through the build process to generate their `.js` CommonJS versions. 

```javascript
/// webpack.config.js
resolve: {
  // Add '.ts' and '.tsx' as resolvable extensions.
  extensions: [".ts", ".tsx", ".mjs", ".js", ".json"]
},
```

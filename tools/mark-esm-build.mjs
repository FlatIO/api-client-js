// Mark dist/esm as ES modules.
//
// The root package.json has no "type", so Node treats every .js file in this package as CommonJS,
// dist/esm included. Importing dist/esm/index.js then either fails or makes Node reparse the file
// as ESM and warn. A package.json holding only {"type":"module"} beside the output flips that for
// dist/esm alone, and leaves dist/ (CommonJS) untouched.
//
// Run after `tsc -p tsconfig.esm.json`. dist/ is not committed, so this has to be a build step.
import { mkdirSync, writeFileSync } from 'node:fs';

mkdirSync('dist/esm', { recursive: true });
writeFileSync('dist/esm/package.json', JSON.stringify({ type: 'module' }, null, 2) + '\n');
console.log('dist/esm/package.json: type=module');

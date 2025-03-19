/* eslint-disable n/no-unsupported-features/node-builtins */
import { snapshot } from 'node:test';

snapshot.setDefaultSnapshotSerializers([
  (value) => `"""yaml\n${value.trim()}\n"""`,
]);

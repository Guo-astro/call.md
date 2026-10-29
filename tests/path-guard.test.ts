/**
 * Tests for the path-containment guard used by `open-call-md-folder`
 * (src/main/ipc/app.ts) to stop it opening arbitrary folders.
 *
 * Run with: npm test
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'path';
import { isPathWithinRoot } from '../src/main/lib/path-guard';

const root = path.join('/Users', 'someone', '.call_md');

test('accepts the root itself', () => {
  assert.equal(isPathWithinRoot(root, root), true);
});

test('accepts a real descendant of the root', () => {
  assert.equal(isPathWithinRoot(path.join(root, 'recordings', 'session-1'), root), true);
});

test('rejects a sibling directory that merely shares the root as a string prefix', () => {
  // A plain `startsWith` check would wrongly accept this: the string
  // "/Users/someone/.call_md_evil" starts with "/Users/someone/.call_md".
  assert.equal(isPathWithinRoot(`${root}_evil`, root), false);
  assert.equal(isPathWithinRoot(`${root}-leak/secret`, root), false);
});

test('rejects unrelated paths', () => {
  assert.equal(isPathWithinRoot('/etc/passwd', root), false);
  assert.equal(isPathWithinRoot(path.join('/Users', 'someone'), root), false);
});

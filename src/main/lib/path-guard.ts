import path from 'path';

/**
 * Whether `targetPath` is the given `rootPath` or a descendant of it.
 *
 * A plain `targetPath.startsWith(rootPath)` string check is unsafe: it also
 * matches a sibling directory whose name merely shares the prefix, e.g.
 * `~/.call_md_evil` starts with the string `~/.call_md`. This requires the
 * match to be the root itself or a real path segment under it.
 *
 * Both paths must already be absolute and normalized (e.g. via
 * `path.resolve`) - this function does no resolution of its own.
 */
export function isPathWithinRoot(targetPath: string, rootPath: string): boolean {
  if (targetPath === rootPath) return true;
  const rootWithSep = rootPath.endsWith(path.sep) ? rootPath : rootPath + path.sep;
  return targetPath.startsWith(rootWithSep);
}

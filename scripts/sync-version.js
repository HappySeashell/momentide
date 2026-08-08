'use strict';

const fs = require('node:fs/promises');

const VERSION_DECLARATION = /const atVersion = '([^']*)';/g;

const replaceVersion = (source, version) => {
  if (typeof version !== 'string' || version.trim() === '') {
    throw new Error('Package version must be a non-empty string');
  }

  const matches = source.match(VERSION_DECLARATION) || [];
  if (matches.length !== 1) {
    throw new Error('Expected exactly one atVersion declaration');
  }

  return source.replace(
    VERSION_DECLARATION,
    `const atVersion = '${version}';`
  );
};

const syncVersion = async ({ packagePath, versionPath }) => {
  const packageContents = await fs.readFile(packagePath, 'utf8');
  const packageData = JSON.parse(packageContents);
  const source = await fs.readFile(versionPath, 'utf8');
  const updatedSource = replaceVersion(source, packageData.version);

  await fs.writeFile(versionPath, updatedSource);
};

module.exports = {
  replaceVersion,
  syncVersion
};

const fs = require('node:fs');

function createTemplateModule ({ templates, outputPath }) {
  const values = Object.fromEntries(Object.entries(templates).map(([name, filePath]) => [name, fs.readFileSync(filePath, 'utf8')]));
  const source = `const ArtitalkTemplates = ${JSON.stringify(values)};

ArtitalkTemplates.render = function (name, values) {
  return ArtitalkTemplates[name].replace(/{{([A-Za-z0-9]+)}}/g, function (_placeholder, key) {
    return values[key] === undefined ? '' : String(values[key]);
  });
};
`;

  fs.writeFileSync(outputPath, source);
}

module.exports = { createTemplateModule };

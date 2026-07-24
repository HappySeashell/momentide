const fs = require('node:fs');
const path = require('node:path');

function createSvgModule ({ svgDirectory, outputPath }) {
  const icons = Object.fromEntries(
    fs.readdirSync(svgDirectory)
      .filter(file => file.endsWith('.svg'))
      .sort()
      .map(file => [path.basename(file, '.svg'), fs.readFileSync(path.join(svgDirectory, file), 'utf8').trim()])
  );
  const module = [
    'const ArtitalkSvgAssets = ' + JSON.stringify(icons) + ';',
    'const ArtitalkSvg = {',
    '  render: function (name, values) {',
    '    const svg = ArtitalkSvgAssets[name];',
    "    if (!svg) return '';",
    "    return svg.replace(/\\{\\{([a-zA-Z0-9_]+)\\}\\}/g, function (placeholder, key) {",
    "      return values && typeof values[key] !== 'undefined' ? values[key] : '';",
    '    });',
    '  }',
    '};',
    ''
  ].join('\n');
  fs.writeFileSync(outputPath, module);
}

module.exports = { createSvgModule };

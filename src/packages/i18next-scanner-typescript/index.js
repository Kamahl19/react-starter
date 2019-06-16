const fs = require('fs');
const path = require('path');
const typescript = require('typescript');

module.exports = function typescriptTransform(options = {}) {
  if (!options.extensions) {
    options.extensions = ['.ts', '.tsx'];
  }

  return function transform(file, enc, done) {
    const { base, ext } = path.parse(file.path);

    if (options.extensions.includes(ext) && !base.includes('.d.ts')) {
      const content = fs.readFileSync(file.path, enc);

      const { outputText } = typescript.transpileModule(content, {
        compilerOptions: {
          target: 'es2018',
        },
        fileName: path.basename(file.path),
      });

      this.parser.parseTransFromString(outputText);
      this.parser.parseFuncFromString(outputText);
    }

    done();
  };
};

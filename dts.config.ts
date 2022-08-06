
const tools = require('./tools.ts')

const config = {
  entries: [
    {
      filePath: "./src/index.ts",
      outFile: `./dist/${tools.packageName}.d.ts`,
      noCheck: false,
    },
  ],
};

module.exports = config
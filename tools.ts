const json = require('./package.json')

function getPackageName() {
  const names = json.name.split("/")
  if (names.length === 2) {
    return names[1]
  }
  return names[0]
};


const packageName = getPackageName()

function getPackageNameUpper() {
  try {
    return packageName.replace(/-./g, (char) => char[1].toUpperCase());
  } catch (err) {
    throw new Error("Name property in package.json is missing.");
  }
};

const packageNameUpper = getPackageNameUpper()

const fileNames = {
  es: `${packageName}.mjs`,
  cjs: `${packageName}.cjs`,
  iife: `${packageName}.iife.js`,
};

module.exports = {
  getPackageName,
  packageName,
  getPackageNameUpper,
  packageNameUpper,
  fileNames
}
import PackageJSON from "../package.json";

/**
 * @internal
 */
const versionNumbers = PackageJSON.version.split(".");

export default versionNumbers;

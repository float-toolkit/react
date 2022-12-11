// @ts-check

import { readdir, readFile, rm } from "fs/promises";
import { resolve, sep } from "path";

import { build } from "esbuild";
import { dTSPathAliasPlugin } from "esbuild-plugin-d-ts-path-alias";

const declarationDir = "./typings/";

const banner = `/**
 * Float Toolkit for React
 * NPM package by LuisFerLCC
 * @float-toolkit/react
 *
 * https://github.com/float-toolkit/react/blob/master/LICENSE
 */
`;

/**
 * @param {string} path
 */
const isDeclarationFile = path => path.endsWith(".d.ts");

/**
 * @param {string} path
 */
const isSourceMap = path => path.endsWith(".map");

/**
 * @param {string} path
 */
const isDir = path => !isDeclarationFile(path) && !isSourceMap(path);

/**
 * @param {string} path
 */
async function allDeclarationFilesInDir(path) {
	const files = (await readdir(path)).map(filename => resolve(path, filename));

	await Promise.all(
		files.filter(filename => isDir(filename)).map(async filename => files.push(...(await allDeclarationFilesInDir(filename))))
	);

	return files.filter(file => isDeclarationFile(file));
}

/**
 * @param {string} path
 */
async function allSubdirs(path) {
	const dirs = (await readdir(path)).map(dirname => resolve(path, dirname));
	await Promise.all(dirs.filter(dirname => isDir(dirname)).map(async filename => dirs.push(...(await allSubdirs(filename)))));

	return dirs.filter(dir => isDir(dir));
}

/**
 * @type {import("esbuild").Format[]}
 */
const formats = ["cjs", "esm"];

await Promise.all(
	formats.map(format =>
		build({
			entryPoints: ["./src/index.ts"],
			platform: "neutral",
			target: "es6",
			format,
			external: ["@float-toolkit/core", "react"],

			outfile: `./dist/index.${format === "esm" ? "m" : ""}js`,
			banner: {
				js: banner,
			},
			bundle: true,
			treeShaking: true,
			sourcemap: true,
			sourcesContent: false,

			plugins: [
				dTSPathAliasPlugin({
					tsconfigPath: `${process.cwd()}${sep}tsconfig.lib.json`,
					outputPath: declarationDir,
				}),
			],
		})
	)
);

const declarationFiles = await allDeclarationFilesInDir(declarationDir);
const typingsSubdirs = await allSubdirs(declarationDir);

await Promise.all(
	declarationFiles.map(async file => {
		if (!(await readFile(file)).toString().match(/^export ({}|default (?!function|abstract|class|interface)\w+)/)) return;

		await rm(file);
		return rm(`${file}.map`);
	})
);

await Promise.all(
	typingsSubdirs.map(async dir => {
		if (!(await readdir(dir)).length) return rm(dir, { recursive: true });
	})
);

console.log("Compiled successfully.");

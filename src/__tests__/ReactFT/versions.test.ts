import { describe, expect, it } from "vitest";

import FloatToolkit from "@float-toolkit/core";
import PackageJSON from "../../../package.json";

import { ReactFT } from "../..";

describe("ReactFT.VERSION", () => {
	it("should contain the full version tag", () => {
		expect(ReactFT.VERSION.full).toBe(PackageJSON.version);
	});

	it("should contain the major number version", () => {
		expect(ReactFT.VERSION.major).toBe(PackageJSON.version.split(".")[0]);
	});

	it("should contain the minor number version", () => {
		expect(ReactFT.VERSION.minor).toBe(PackageJSON.version.split(".")[1]);
	});

	it("should contain the patch version", () => {
		expect(ReactFT.VERSION.patch).toBe(PackageJSON.version.split(".")[2]);
	});
});

describe("ReactFT.CORE_VERSION", () => {
	it("should equal FloatToolkit.VERSION", () => {
		expect(ReactFT.CORE_VERSION).toEqual(FloatToolkit.VERSION);
	});
});

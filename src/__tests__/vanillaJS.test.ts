import { expect, it } from "vitest";

it("should still have floating point issues (otherwise FloatToolkit is useless)", () => {
	expect(0.1 + 0.2).not.toBe(0.3);
});

it("should have a Number.prototype.toFixed(n) method to round floats", () => {
	const roundedSum = Number((0.1 + 0.2).toFixed(10));
	expect(roundedSum).toBe(0.3);
});

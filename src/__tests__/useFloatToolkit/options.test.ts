import { act, renderHook, RenderHookResult } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import useFloatToolkit, { ReactFT } from "../..";

import { defaultOptions } from "../__mocks__/defaultOptions";

let hookRenderer: RenderHookResult<ReactFT, unknown>;
beforeEach(() => {
	hookRenderer = renderHook(() => useFloatToolkit());
});

describe("ReactFT.options", () => {
	it("should return a valid frozen ReactFT.Options object", () => {
		hookRenderer.rerender();

		const { current } = hookRenderer.result;
		expect(current.options).toEqual(defaultOptions);
		expect(Object.isFrozen(current.options)).toBe(true);
	});
});

describe("ReactFT.setOptions()", () => {
	let prevOptions: Readonly<ReactFT.Options>;
	let returnedOptions: Readonly<ReactFT.Options>;

	beforeEach(() => {
		const { current } = hookRenderer.result;

		prevOptions = current.options;
		returnedOptions = current.setOptions({
			forceUseDefaultPrecision: true,
		});
	});

	it("should modify the hook's options", () => {
		expect(returnedOptions).toEqual<ReactFT.Options>({ ...prevOptions, forceUseDefaultPrecision: true });
	});

	it("should return a valid frozen ReactFT.Options object", () => {
		expect(Object.isFrozen(returnedOptions)).toBe(true);
	});

	it("should reset the output if instructed", () => {
		const { result, rerender } = hookRenderer;
		const newOptions: ReactFT.Options = {
			forceUseDefaultPrecision: true,
		};

		act(() => {
			result.current.add([1]);
			rerender();
		});
		expect(result.current.output).toBe(1);

		act(() => {
			result.current.setOptions(newOptions, true);
			rerender();
		});
		expect(result.current.output).toBe(0);
		expect(result.current.options).toEqual<ReactFT.Options>({ ...returnedOptions, ...newOptions });
	});
});

describe("FloatToolkit.resetOptions()", () => {
	let returnedOptions: Readonly<ReactFT.Options>;

	beforeEach(() => {
		const { current } = hookRenderer.result;

		returnedOptions = current.resetOptions({
			forceUseDefaultPrecision: true,
		});
	});

	it("should reset and modify the FloatToolkit's options", () => {
		expect(returnedOptions).toEqual<ReactFT.Options>({ ...defaultOptions, forceUseDefaultPrecision: true });
	});

	it("should return a valid frozen FloatToolkit.Options object", () => {
		expect(Object.isFrozen(returnedOptions)).toBe(true);
	});

	it("should reset the output if instructed", () => {
		const { result, rerender } = hookRenderer;
		const newOptions: ReactFT.Options = {
			forceUseDefaultPrecision: true,
		};

		act(() => {
			result.current.add([1]);
			rerender();
		});
		expect(result.current.output).toBe(1);

		act(() => {
			result.current.resetOptions(newOptions, true);
			rerender();
		});
		expect(result.current.output).toBe(0);
		expect(result.current.options).toEqual<ReactFT.Options>({ ...defaultOptions, ...newOptions });
	});
});

import { beforeEach, expect, it } from "vitest";
import { act, renderHook, RenderHookResult } from "@testing-library/react";

import useFloatToolkit, { ReactFT } from "../..";

let hookRenderer: RenderHookResult<ReactFT, unknown>;

beforeEach(() => {
	hookRenderer = renderHook(() => useFloatToolkit());
});

it("should have an initial value of 0", () => {
	hookRenderer.rerender();
	expect(hookRenderer.result.current.output).toBe(0);
});

it("should be changed by operation methods", () => {
	const { rerender, result } = hookRenderer;

	function run(callback: () => void, expectedOutput: number) {
		act(() => {
			callback();
			rerender();
		});

		expect(result.current.output).toBe(expectedOutput);
	}

	run(() => result.current.round(0.1 + 0.2), 0.3);
	run(() => result.current.add([0.1, 0.2]), 0.3);
	run(() => result.current.subtract([0.8, 0.1, 0.3]), 0.4);
	run(() => result.current.multiply([0.1, 0.9]), 0.09);
	run(() => result.current.divide([0.09, 0.9]), 0.1);
});

it("should be reset to 0 when calling ReactFT.resetOutput()", () => {
	const { rerender, result } = hookRenderer;

	result.current.resetOutput();
	rerender();
	expect(result.current.output).toBe(0);
});

import { renderHook, RenderHookResult } from "@testing-library/react";

import useFloatToolkit, { ReactFT } from "../..";

import { defaultOptions } from "../__mocks__/defaultOptions";

interface FTArgs {
	precision?: ReactFT.Precision;
	options?: ReactFT.Options;
}

let hookRenderer: RenderHookResult<ReactFT, FTArgs>;

beforeEach(() => {
	hookRenderer = renderHook((args: FTArgs) => useFloatToolkit(args.precision, args.options), {
		initialProps: {},
	});
});

describe("useFloatToolkit()", () => {
	it("should render with the default options", () => {
		const { current } = hookRenderer.result;

		expect(current).toBeTruthy();

		expect(current.defaultPrecision).toBe(10);
		expect(current.options).toEqual(defaultOptions);
	});

	it("should render with custom options", () => {
		const precision = 5;

		const options: ReactFT.Options = {
			forceUseDefaultPrecision: true,
		};

		hookRenderer.rerender({ precision, options });

		const { current } = hookRenderer.result;

		expect(current.defaultPrecision).toBe(precision);
		expect(current.options).toEqual<ReactFT.Options>({ ...defaultOptions, ...options });
	});
});

describe("ReactFT.defaultPrecision", () => {
	it("should be assignable to a ReactFT.Precision value", () => {
		const { current } = hookRenderer.result;

		current.defaultPrecision = 5;
		expect(current.defaultPrecision).toBe(5);
	});
});

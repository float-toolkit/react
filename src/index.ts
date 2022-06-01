import { useDebugValue, useMemo, useState } from "react";

import FloatToolkit, { FloatToolkitOptions, FloatToolkitPrecisionInteger } from "@float-toolkit/core";

namespace ReactFT {
	/**
	 * An integer between 1 and 17, which can be used as the default precision for the useFloatToolkit hook.
	 */
	export type Precision = FloatToolkitPrecisionInteger;

	/**
	 * Options that can be set to modify the behavior of the useFloatToolkit hook.
	 */
	export interface Options extends FloatToolkitOptions {}
}

/**
 * Contains the properties and methods from the FloatToolkit class, as well as special ones for React.
 */
interface ReactFT {
	/**
	 * An integer between 1 and 17.
	 * Defines the precision (number of decimals) to use by default, if the precision is not specified in the method itself.
	 */
	get defaultPrecision(): ReactFT.Precision;
	set defaultPrecision(newPrecision: ReactFT.Precision);

	/**
	 * The options object used in this instance of useFloatToolkit.
	 */
	get options(): ReactFT.Options;

	add(numbers: number[], precision?: ReactFT.Precision): number;
	divide(numbers: number[], precision?: ReactFT.Precision): number;
	multiply(numbers: number[], precision?: ReactFT.Precision): number;
	resetOptions(options?: ReactFT.Options, resetOutput?: boolean): ReactFT.Options;
	round(n: number, precision?: ReactFT.Precision): number;
	setOptions(options?: ReactFT.Options, resetOutput?: boolean): ReactFT.Options;
	subtract(numbers: number[], precision?: ReactFT.Precision): number;

	/**
	 * A reactive state variable containing the returned value from the last method called.
	 */
	output: number;

	/**
	 * Resets the output to 0.
	 */
	resetOutput(): void;
}

/**
 * A React hook that returns FloatToolkit methods and an `output` state.
 *
 * @param defaultPrecision The precision (number of decimals) to use if not specified in the method itself. Can be changed later. Default value if 10.
 * @param options An optional configuration object.
 *
 * @example
 * import useFloatToolkit from "@float-toolkit/react";
 *
 * function Sum() {
 * 	const { add, output } = useFloatToolkit(2);
 * }
 */
function useFloatToolkit(defaultPrecision?: ReactFT.Precision, options?: ReactFT.Options): ReactFT {
	const [output, setOutput] = useState(0);
	useDebugValue(output);

	const ft = useMemo(() => new FloatToolkit(defaultPrecision, options), [defaultPrecision, options]);

	function add(numbers: number[], precision?: ReactFT.Precision): number {
		const result = ft.add(numbers, precision);

		setOutput(result);
		return result;
	}

	function divide(numbers: number[], precision?: ReactFT.Precision): number {
		const result = ft.divide(numbers, precision);

		setOutput(result);
		return result;
	}

	function multiply(numbers: number[], precision?: ReactFT.Precision): number {
		const result = ft.multiply(numbers, precision);

		setOutput(result);
		return result;
	}

	function resetOptions(options?: ReactFT.Options, resetOutput?: boolean): ReactFT.Options {
		if (resetOutput) _method_resetOutput();
		return ft.resetOptions(options);
	}

	function round(n: number, precision?: ReactFT.Precision): number {
		const result = ft.round(n, precision);

		setOutput(result);
		return result;
	}

	function setOptions(options?: ReactFT.Options, resetOutput?: boolean): ReactFT.Options {
		if (resetOutput) _method_resetOutput();
		return ft.resetOptions(options);
	}

	function subtract(numbers: number[], precision?: ReactFT.Precision): number {
		const result = ft.subtract(numbers, precision);

		setOutput(result);
		return result;
	}

	function _method_resetOutput(): void {
		setOutput(0);
	}

	return {
		get defaultPrecision(): ReactFT.Precision {
			return ft.defaultPrecision;
		},
		set defaultPrecision(newPrecision: ReactFT.Precision) {
			ft.defaultPrecision = newPrecision;
		},

		get options(): ReactFT.Options {
			return ft.options;
		},

		add,
		divide,
		multiply,
		resetOptions,
		round,
		setOptions,
		subtract,

		output,
		resetOutput: _method_resetOutput,
	};
}

export default useFloatToolkit;
export { ReactFT };

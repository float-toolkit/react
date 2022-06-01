import { useDebugValue, useMemo, useState } from "react";

import FloatToolkit, { FloatToolkitOptions, FloatToolkitPrecisionInteger } from "@float-toolkit/core";

namespace ReactFT {
	export type Precision = FloatToolkitPrecisionInteger;
	export interface Options extends FloatToolkitOptions {}
}

interface ReactFT {
	get defaultPrecision(): ReactFT.Precision;
	set defaultPrecision(newPrecision: ReactFT.Precision);

	get options(): ReactFT.Options;

	add(numbers: number[], precision?: ReactFT.Precision): number;
	divide(numbers: number[], precision?: ReactFT.Precision): number;
	multiply(numbers: number[], precision?: ReactFT.Precision): number;
	resetOptions(options?: ReactFT.Options, resetOutput?: boolean): ReactFT.Options;
	round(n: number, precision?: ReactFT.Precision): number;
	setOptions(options?: ReactFT.Options, resetOutput?: boolean): ReactFT.Options;
	subtract(numbers: number[], precision?: ReactFT.Precision): number;

	output: number;
	resetOutput(): void;
}

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

<div align="center" style="margin-bottom: 0.5rem">
	<img src="https://raw.githubusercontent.com/float-toolkit/react/HEAD/media/ftreact.svg" width="150" />
</div>

<div align="center">

# Float Toolkit for React

[![NPM latest version](https://img.shields.io/npm/v/@float-toolkit/react?label=version&logo=npm)](https://www.npmjs.com/package/@float-toolkit/react)
[![NPM downloads](https://img.shields.io/npm/dt/@float-toolkit/react?logo=npm)](https://www.npmjs.com/package/@float-toolkit/react)

</div>

A [React](https://reactjs.org/) [hook](https://reactjs.org/docs/hooks-intro.html) wrapper for [**Float Toolkit**](https://float-toolkit.web.app/)

## Get started

### Installation

To add Float Toolkit to your React app, run this command:

```sh-session
npm install @float-toolkit/react
```

### Usage

The package export is a **React hook** called `useFloatToolkit`. It returns an object with an `output` state, as well as math functions that also serve as setters for the output.

```js
import React, { useEffect } from "react";
import useFloatToolkit from "@float-toolkit/react";

function Sum({ x, y }) {
	const { add, outlet } = useFloatToolkit();

	useEffect(() => {
		add([x, y]);
	}, [x, y]);

	return <span className="number">{outlet}</span>;
}
```

### TypeScript

<div align="center" style="margin: 0.5rem 0">
	<img src="https://raw.githubusercontent.com/float-toolkit/react/HEAD/media/tsftreact.svg" width="100" />
</div>

Just like its parent package, Float Toolkit for React is written in [TypeScript](https://www.typescriptlang.org/). You can import the `ReactFT` namespace which contains all the type declarations used by the package.

#### Example:

```tsx
import React, { FC, useEffect } from "react";
import useFloatToolkit, { ReactFT } from "@float-toolkit/react";

interface Props {
	numbers: number[];
	precision?: ReactFT.Precision;
}

const Sum: FC = (props) => {
	const { add, outlet } = useFloatToolkit(props.precision);

	useEffect(() => {
		add(props.numbers);
	}, [props.numbers]);

	return <span className="number">{outlet}</span>;
};
```

## Links

-   [FloatToolkit documentation (Vanilla JS)](https://float-toolkit.web.app/)
-   [GitHub](https://github.com/float-toolkit/react)
-   [npm](https://www.npmjs.com/package/@float-toolkit/react)

## Contributing

Before creating an issue, please consider the following:

-   Refer to the [FloatToolkit documentation](https://float-toolkit.web.app/) and read **this file** carefully to make sure the error is actually a bug and not a mistake of your own.
-   Make sure the issue hasn't already been reported or suggested.
-   After following these steps, you can read the [contribution guidelines](https://github.com/float-toolkit/react/blob/master/.github/CONTRIBUTING.md) and follow the steps to submit a PR.

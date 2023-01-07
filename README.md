<div align="center" style="margin-bottom: 0.5rem">
	<img src="https://raw.githubusercontent.com/float-toolkit/react/HEAD/media/ftreact.svg" width="150" />
</div>

<div align="center">

# Float Toolkit for React

[![NPM latest version](https://img.shields.io/npm/v/@float-toolkit/react?label=version&logo=npm)](https://www.npmjs.com/package/@float-toolkit/react)
[![NPM downloads](https://img.shields.io/npm/dt/@float-toolkit/react?logo=npm)](https://www.npmjs.com/package/@float-toolkit/react)
[![Tests status](https://img.shields.io/github/actions/workflow/status/float-toolkit/react/testWithVitest.yml?branch=master&label=tests&logo=vite&logoColor=white)](https://github.com/float-toolkit/react/actions/workflows/testWithVitest.yml)
[![Code coverage with Codecov](https://img.shields.io/codecov/c/github/float-toolkit/react/tests?logo=codecov&logoColor=white)](https://codecov.io/gh/float-toolkit/react)
[![Contributor Covenant Code of Conduct](https://img.shields.io/badge/Contributor%20Covenant-2.1-5e0d73)](https://github.com/float-toolkit/react/blob/master/.github/CODE_OF_CONDUCT.md)

</div>

A [React](https://reactjs.org/) [hook](https://reactjs.org/docs/hooks-intro.html) wrapper for
[**Float Toolkit**](https://float-toolkit.web.app/)

## Get started

### Installation

To add Float Toolkit to your React app, run this command:

```sh-session
npm install @float-toolkit/react
```

### Usage

The package export is a **React hook** called `useFloatToolkit`. It returns an object with an `output` state, as well as FloatToolkit
methods that also serve as setters for the output.

```js
import { useEffect } from "react";
import useFloatToolkit from "@float-toolkit/react";

function Sum({ x, y }) {
	const { add, output } = useFloatToolkit();

	useEffect(() => {
		add([x, y]);
	}, [x, y]);

	return <span className="number">{output}</span>;
}
```

### TypeScript

<div align="center" style="margin: 0.5rem 0">
	<img src="https://raw.githubusercontent.com/float-toolkit/react/HEAD/media/tsftreact.svg" width="100" />
</div>

Just like its parent package, Float Toolkit for React is written in [TypeScript](https://www.typescriptlang.org/). The `ReactFT`
namespace contains all the type definitions used by the package.

```tsx
import { FC, useEffect } from "react";
import useFloatToolkit, { ReactFT } from "@float-toolkit/react";

interface Props {
	numbers: number[];
	precision?: ReactFT.Precision;
}

const Sum: FC<Props> = props => {
	const { add, output } = useFloatToolkit(props.precision);

	useEffect(() => {
		add(props.numbers);
	}, [props.numbers]);

	return <span className="number">{output}</span>;
};
```

## Support

Need help using Float Toolkit? Don't hesitate to reach out on
[GitHub Discussions](https://github.com/float-toolkit/react/discussions/categories/q-a)!

## Links

-   [FloatToolkit documentation (Vanilla JS)](https://float-toolkit.web.app)
-   [GitHub](https://github.com/float-toolkit/react)
-   [npm](https://npmjs.com/package/@float-toolkit/react)

## Contributing

Before creating an issue, please consider the following:

-   Read the [documentation](https://float-toolkit.web.app) and **this file** carefully to make sure the error is actually a bug and
    not a mistake of your own.
-   Make sure the issue hasn't already been reported or suggested.
-   After following these steps, you can file an issue using one of our
    [templates](https://github.com/float-toolkit/react/issues/new/choose). Please make sure to follow our
    [Code of Conduct](https://github.com/float-toolkit/react/blob/master/.github/CODE_OF_CONDUCT.md).
-   If you wish to [submit a pull request](https://github.com/float-toolkit/react/compare) alongside your issue, please follow our
    [contribution guidelines](https://github.com/float-toolkit/react/blob/master/.github/CONTRIBUTING.md).

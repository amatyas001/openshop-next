Elements are composed by [Chakra-UI](https://chakra-ui.com) components and preserve the library features so [Style Props](https://chakra-ui.com/style-props) can be passed to them and accessibility remains optimized.

> _Style Props are a way to alter the style of a component by simply passing props to it. It helps to save time by providing helpful shorthand ways to style components._

For more information visit the [Chakra UI](https://chakra-ui.com) documentation.

Components are divided into two main category: _wrappers_ and _single responsibility_ elements. Wrapper components does not contain business logic, however there are special cases like _handling lifted states to keep sensitive data locally_ and not to populate them to the Redux store which is persisted on the machine.

**State Dependencies** and **Wrapped Components** are documented in each description to give brief information about the context of posible interactions of the actual component. _Examples_ prepared with proper state and may render extra controls to test different cases with ease.

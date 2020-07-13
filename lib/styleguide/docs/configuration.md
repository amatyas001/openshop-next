## Absolute imports

The application uses its own namespace `@app` referencing to the resolved absolute path of the root directory.

## Component styling and colors

> `/config/colors/*.js`

Reusable components has base color variants which are managed in separated files starting with `_` (underscore) character _(eg.: `/config/colors/_button.js` containing the variants of `BUTTON` styles)_. Application default colors are set in `/config/colors/DEFAULT.js` file.

### Variants

---

#### **Primary**

```jsx noeditor
import { Button } from '@app/components';
<Button children='Primary Button' />;
```

```jsx static
import { Button } from '@app/components';
<Button children='Primary Button' />;
```

---

#### **Secondary**

```jsx noeditor
import { Button } from '@app/components';
<Button variant='secondary' children='Secondary Button' />;
```

---

```jsx static
import { Button } from '@app/components';
<Button variant='secondary' children='Secondary Button' />;
```

---

#### **Danger**

```jsx noeditor
import { Button } from '@app/components';
<Button variant='danger' children='Danger Button' />;
```

```jsx static
import { Button } from '@app/components';
<Button variant='danger' children='Danger Button' />;
```

---

#### **Transparent**

```jsx noeditor
import { Button } from '@app/components';
<Button variant='transparent' children='Transparent Button' />;
```

```jsx static
import { Button } from '@app/components';
<Button variant='transparent' children='Transparent Button' />;
```

---

### **Custom styles**

Color objects can be also used in the application by importing them explicitly from `@app/config/colors` namespace as in the following example of a custom button:

```jsx noeditor
import { Button } from '@app/components';
import { BUTTON } from '@app/config/colors';

const ButtonDeleteTransparent = () => (
  <Button variant='transparent' _hover={{ color: BUTTON.danger.dark }}>
    Transparent `Button` with custom hover color
  </Button>
);

<ButtonDeleteTransparent />;
```

```jsx static
import { Button } from '@app/components';
import { BUTTON } from '@app/config/colors';

const ButtonDeleteTransparent = () => (
  <Button variant='transparent' _hover={{ color: BUTTON.danger.dark }}>
    Transparent `Button` with custom hover color
  </Button>
);

<ButtonDeleteTransparent />;
```

## Static Contents

### Menus

> `/config/menus/*.js`

_Description by example: the top navigation bar contains only elements while footer has sections (multiple columns of elements)_

#### **Elements**

> Object representing a navigation item _(eg.: top navbar is a list of elements)_

- `text`: _title of the element which will be displayed in the UI_
- `link`: _passed as`href` attribute to the [`next/link`](https://nextjs.com/routing) routing handler, displayed in the URI_

#### **Sections**

> Wrapper for multiple elements with a dedicated heading _(eg.: sections in the footer)_

- `title`: _heading of a section shortly describing the contained elements_
- `icon`: _icon element rendered as an initial to a section heading_
- `elements`: _list of navigation items related to a section (format: see `main.js`)_

### Others

**`/config/fields/*.js`**

> Specification of input fields which are dynamically generated _(eg.: [Payment Form](#paymentform) component)_

- `name`: _name of the input field_
- `type`: _a valid input type (see [Chakra Inputs](https://chakra-ui.com/input))_
- `placeholder`: _placeholder value of the related field_

**`/config/state/initial.js`**

> Initial application state for Redux. See [State Management](#section-state-management) for detailed documentation of the global state management.

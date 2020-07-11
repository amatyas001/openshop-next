### Interactive Example

```jsx
import { Button } from '@app/components';

const [show, setShow] = React.useState(false);

<>
  <Button
    children='Toggle Panel'
    variant='transparent'
    onClick={() => setShow((prev) => !prev)}
  />
  <Panel toggle={show}>Hidden content</Panel>
</>;
```

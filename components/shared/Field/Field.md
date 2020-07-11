### Interactive Example

```jsx
import { Heading } from '@chakra-ui/core';

const [value, setValue] = React.useState('');
<>
  <Field
    label='My Label Text'
    id='ElementID'
    type='text'
    placeholder='My Placeholder Text'
    required={false}
    autoComplete={false}
    value={value}
    onChange={(e) => setValue(e.target.value)}
  />
  <Heading>Input value: "{value}"</Heading>
</>;
```

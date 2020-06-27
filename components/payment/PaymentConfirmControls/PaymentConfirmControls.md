```jsx
import { Flex } from '@chakra-ui/core';
import { Button } from '@app/components';

const [complete, setComplete] = React.useState(false);

const handler = {
  complete,
  confirmHandler: () => {},
  loadHandler: () => {},
};

<Flex alignItems='center' flexDirection='column'>
  <Button onClick={() => setComplete(!complete)} mb='25px' width='100%'>
    Toggle Complete
  </Button>
  <PaymentConfirmControls
    confirmHandler={handler.confirmHandler}
    complete={handler.complete}
    loadHandler={handler.loadHandler}
  />
</Flex>;
```

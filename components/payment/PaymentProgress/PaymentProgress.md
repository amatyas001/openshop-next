```jsx
import { useDispatch } from 'react-redux';
import { Flex, Heading } from '@chakra-ui/core';
import {
  addToCart,
  paymentReview,
  paymentForm,
  paymentConfirm,
  paymentSuccess,
  paymentError,
  paymentCancelled,
} from '@app/redux/actions';
import { Button } from '@app/components';

const dispatch = useDispatch();

const item = {
  id: 0,
  img: '1.jpg',
  name: 'My fancy item',
  desc: 'The best item in the world',
  color: 'Rainbow',
  price: 100,
};

React.useEffect(() => {
  dispatch(addToCart(item));
}, []);

<>
  <Heading fontSize='1.5rem' m='0' mb='10px' textAlign='center'>
    select stage to view progress
  </Heading>
  <Flex>
    <Button width='100%' onClick={() => dispatch(paymentReview())}>
      Review
    </Button>
    <Button width='100%' onClick={() => dispatch(paymentForm())}>
      Form
    </Button>
    <Button width='100%' onClick={() => dispatch(paymentConfirm())}>
      Confirm
    </Button>
    <Button width='100%' onClick={() => dispatch(paymentSuccess())}>
      Success
    </Button>
    <Button width='100%' onClick={() => dispatch(paymentCancelled())}>
      Cancelled
    </Button>
    <Button width='100%' onClick={() => dispatch(paymentError())}>
      Error
    </Button>
  </Flex>
  <PaymentProgress />
</>;
```

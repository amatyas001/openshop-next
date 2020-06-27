```jsx
import { useDispatch } from 'react-redux';
import { paymentError, addToCart } from '@app/redux/actions';

const dispatch = useDispatch();

const item = {
  id: 0,
  img: '1.jpg',
  name: 'My fancy item',
  desc: 'The best item in the world',
  color: 'Rainbow',
  price: 100,
};

const error = {
  message: 'Error with the payment!',
};

React.useEffect(() => {
  dispatch(addToCart(item));
  dispatch(paymentError(error));
}, []);

<>
  <PaymentError />
</>;
```

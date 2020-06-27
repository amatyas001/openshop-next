```jsx
import { useDispatch } from 'react-redux';
import { paymentForm, addToCart, getAmount } from '@app/redux/actions';

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
  dispatch(getAmount());
  dispatch(paymentForm());
}, []);

<PaymentForm />;
```

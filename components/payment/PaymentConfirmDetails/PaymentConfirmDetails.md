```jsx
import { useDispatch } from 'react-redux';
import { paymentConfirm, addToCart } from '@app/redux/actions';

const dispatch = useDispatch();

const item = {
  id: 0,
  img: '1.jpg',
  name: 'My fancy item',
  desc: 'The best item in the world',
  color: 'Rainbow',
  price: 100,
};

const intent = {
  id: 'paymentid',
};

const details = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  phone: '(941) 555-0123',
  address: 'J191 S. Illinois Street, Everett, MA 02149',
};

React.useEffect(() => {
  dispatch(addToCart(item));
  dispatch(paymentConfirm(details, intent));
}, []);

<PaymentConfirmDetails />;
```

```jsx noeditor
import { useDispatch } from 'react-redux';
import { paymentReview } from '@app/lib/redux/actions';

const dispatch = useDispatch();

const intent = {
  id: 'paymentid',
};

const item = {
  id: 0,
  img: '1.jpg',
  name: 'My fancy item',
  desc: 'The best item in the world',
  color: 'Rainbow',
  price: 100,
};

React.useEffect(() => {
  dispatch(paymentReview());
}, []);

<PaymentReview />;
```

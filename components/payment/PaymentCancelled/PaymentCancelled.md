```jsx noeditor
import { useDispatch } from 'react-redux';
import { paymentCancelled } from '@app/lib/redux/actions';

const dispatch = useDispatch();

const intent = {
  id: 'paymentid',
};

React.useEffect(() => {
  dispatch(paymentCancelled(intent));
}, []);

<PaymentCancelled />;
```

```jsx noeditor
import { useDispatch } from 'react-redux';
import { paymentError } from '@app/lib/redux/actions';

const dispatch = useDispatch();

const error = {
  message: 'Error with the payment!',
};

React.useEffect(() => {
  dispatch(paymentError(error));
}, []);

<PaymentError />;
```

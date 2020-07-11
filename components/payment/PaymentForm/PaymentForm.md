```jsx noeditor
import { useDispatch } from 'react-redux';
import { paymentForm } from '@app/lib/redux/actions';

const dispatch = useDispatch();

React.useEffect(() => {
  dispatch(paymentForm());
}, []);

<PaymentForm />;
```

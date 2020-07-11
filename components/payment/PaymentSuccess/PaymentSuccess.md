```jsx noeditor
import { useDispatch } from 'react-redux';
import { paymentSuccess } from '@app/lib/redux/actions';

const dispatch = useDispatch();

const intent = {
  id: 'Intentid',
};

React.useEffect(() => {
  dispatch(paymentSuccess(intent));
}, []);

<>
  <PaymentSuccess />
</>;
```

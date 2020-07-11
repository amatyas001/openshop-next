```jsx noeditor
import { useDispatch } from 'react-redux';
import { paymentConfirm } from '@app/lib/redux/actions';

const dispatch = useDispatch();

const details = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  phone: '(122) 496 5737',
  address: 'J191 S. Illinois Street, Everett, MA 02149',
};

const intent = {
  id: 'intentid',
};

React.useEffect(() => {
  dispatch(paymentConfirm(details, intent));
}, []);

<>
  <PaymentConfirm />
</>;
```

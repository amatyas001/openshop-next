```jsx
import { useDispatch } from 'react-redux';
import { Button } from '@app/components';
import { paymentForm, addToCart, getAmount } from '@app/redux/actions';

const dispatch = useDispatch();
const [filled, setFilled] = React.useState(false);

const item = {
  id: 0,
  img: '1.jpg',
  name: 'My fancy item',
  desc: 'The best item in the world',
  color: 'Rainbow',
  price: 100,
};

const details = filled
  ? {
      address: 'mock_address',
      email: 'mock_email',
      name: 'mock_name',
      phone: 'mock_phone',
    }
  : {
      address: '',
      email: '',
      name: '',
      phone: '',
    };

React.useEffect(() => {
  dispatch(addToCart(item));
  dispatch(getAmount());
}, []);

<>
  <Button onClick={() => setFilled(!filled)}>Toggle Validity</Button>
  <PaymentFormControls details={details} setLoading={() => {}} />;
</>;
```

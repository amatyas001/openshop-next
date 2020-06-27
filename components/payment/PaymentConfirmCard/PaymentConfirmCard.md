```jsx
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripe = loadStripe('test');

const [loading, setLoading] = React.useState(false);
const [handler, setHandler] = React.useState({});

<Elements stripe={stripe}>
  <PaymentConfirmCard loadHandler={setLoading} setHandler={setHandler} />
</Elements>;
```

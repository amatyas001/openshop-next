import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Flex, Heading, Text } from '@chakra-ui/core';
import { paymentSuccess, paymentError } from '@app/redux/actions';

/**
 * Displays [CardElement](https://stripe.com/docs/stripe-js) with custom error handling
 * and populates its state to wrapper component.
 *
 * **Must be wrapped in [Elements](https://stripe.com/docs/stripe-js) provider**
 *
 * ***State Dependencies***
 * - `payment.status === 'confirm'`
 * - `payment.intent`
 * - `payment.details`
 *
 * ***Wrapped Components***
 * - [CardElement](https://stripe.com/docs/stripe-js)
 *
 * @example
 * ```jsx
 * <Elements stripe={stripe}>
 *  <PaymentConfirmCard loadHandler={setLoading} setHandler={handlersObject} />
 * </Elements>
 * ```
 */
export const PaymentConfirmCard = (props) => {
  const { loadHandler, setHandler } = props;
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { payment = {} } = useSelector((store) => store);
  const { details = {}, intent = {} } = payment;
  const [cardError, setCardError] = React.useState(null);
  const [complete, setComplete] = React.useState(false);

  const confirmHandler = async () => {
    if (!complete) return;
    loadHandler(true);
    const card = elements.getElement(CardElement);
    const { paymentIntent, error } = await stripe.confirmCardPayment(
      intent.secret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: details.name,
            email: details.email,
            phone: details.phone,
          },
        },
      }
    );
    if (paymentIntent && paymentIntent.status === 'succeeded')
      dispatch(paymentSuccess(paymentIntent));
    if (error) dispatch(paymentError(error));
  };

  React.useEffect(() => {
    setHandler({ confirmHandler, complete, loadHandler });
  }, [complete]);

  return (
    <Flex flexDirection='column' width='100%' alignItems='center' {...props}>
      {!cardError ? (
        <Heading
          as='label'
          htmlFor='StripeElement'
          fontSize='1.5rem'
          textAlign='center'
        >
          enter your card details to finish payment
        </Heading>
      ) : (
        <Heading
          as='label'
          htmlFor='StripeElement'
          fontSize='1.5rem'
          textAlign='center'
          color='red.600'
          data-testid='confirm-card-error'
        >
          {cardError.message}
        </Heading>
      )}
      <Flex
        border='1px'
        borderColor='purple.100'
        bg='purple.800'
        width='100%'
        height='50px'
        alignItems='center'
        justifyContent='center'
      >
        <CardElement
          data-testid='confirm-card-element'
          options={{
            iconStyle: 'solid',
            style: {
              base: {
                iconColor: '#FAF5FF',
                color: '#FAF5FF',
                fontWeight: 500,
                fontFamily: 'Montserrat, Open Sans, Segoe UI, sans-serif',
                fontSize: '16px',
                fontSmoothing: 'antialiased',
                ':-webkit-autofill': { color: '#D6BCFA' },
                '::placeholder': { color: '#D6BCFA' },
              },
              invalid: {
                iconColor: '#C53030',
                color: '#C53030',
              },
            },
          }}
          onChange={(e) => {
            setCardError(e.error);
            setComplete(e.complete);
          }}
        />
      </Flex>
      <Text my='1rem' p='7px' fontSize='0.8rem' color='gray.600'>
        Use any future date and CVC with <strong>4242 4242 4242 4242</strong>{' '}
        number for testing
      </Text>
    </Flex>
  );
};

PaymentConfirmCard.propTypes = {
  /**
   * Passed down handler to set loading state in wrapper conponent
   */
  loadHandler: PropTypes.func.isRequired,

  /**
   * Lifting up handlers and card state to [PaymentConfirm](#paymentconfirm)
   */
  setHandler: PropTypes.func.isRequired,
};

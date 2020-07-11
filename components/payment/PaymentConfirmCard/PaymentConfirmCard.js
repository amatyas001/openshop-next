import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Flex, Heading, Text } from '@chakra-ui/core';
import { paymentSuccess, paymentError } from '@app/lib/redux/actions';
import * as COLORS from '@app/config/colors';

/**
 * @see https://amatyas001.github.io/openshop-next/#paymentconfirm
 * @ignore
 */
export const PaymentConfirmCard = (props) => {
  const { loadHandler, setHandler } = props;
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { details, intent } = useSelector((store) => store.payment);
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
          color={COLORS.TEXT.danger}
          data-testid='confirm-card-error'
        >
          {cardError.message}
        </Heading>
      )}
      <Flex
        border='1px'
        borderColor={COLORS.SPACER.light}
        bg={COLORS.BG.dark}
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
                fontWeight: 'bold',
                fontFamily: 'Khand, sans-serif',
                fontSize: '18px',
                fontSmoothing: 'antialiased',
              },
            },
          }}
          onChange={(e) => {
            setCardError(e.error);
            setComplete(e.complete);
          }}
        />
      </Flex>
      <Text my='1rem' p='7px' fontSize='0.8rem' color={COLORS.TEXT.light}>
        Use any future date and CVC with <strong>4242 4242 4242 4242</strong>{' '}
        number for testing
      </Text>
    </Flex>
  );
};

PaymentConfirmCard.propTypes = {
  /**
   * Loading state handler
   */
  loadHandler: PropTypes.func.isRequired,

  /**
   * Lifted card status and confirm handler
   */
  setHandler: PropTypes.func.isRequired,
};

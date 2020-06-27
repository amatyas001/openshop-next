import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import {
  CartContent,
  PaymentConfirmCard,
  PaymentConfirmControls,
  PaymentConfirmDetails,
  Spinner,
} from '@app/components';
import { Flex, Heading, Text } from '@chakra-ui/core';

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || 'test');

/**
 * Wrapper component for the confirm stage elements. See
 * [PaymentConfirmControls](#paymentconfirmcontrols) for
 * details about the next stages after *confirm* step.
 *
 * ***State Dependencies***
 * - `payment.status === 'confirm'`
 * - `payment.details.name`
 *
 * ***Wrapped Components***
 * - [PaymentConfrimDetails](#paymentconfrimdetails)
 * - [CartContent](#cartcontent)
 * - [PaymentConfirmCard](#paymentconfirmcard)
 * - [PaymentConfirmControls](#paymentconfirmcontrols)
 *
 * @expamle
 * ```jsx
 * <PaymentConfirm />
 * ```
 */
export const PaymentConfirm = (props) => {
  const { payment = {} } = useSelector((store) => store);
  const { details = {} } = payment;

  const [loading, setLoading] = React.useState(false);
  const [handler, setHandler] = React.useState({
    complete: false,
    confirmHandler: () => {},
    loadHandler: () => {},
  });

  return !loading && stripe ? (
    <Flex
      flexDirection='column'
      alignItems='center'
      width='100%'
      aria-hidden={payment.status !== 'confirm'}
      {...props}
    >
      <Heading data-testid='confirm-intent-name' my='1rem'>
        Hello, {details.name}!
      </Heading>

      <Text fontSize='1.1rem' fontWeight='bold' my='0.7rem'>
        Please review your payment details and confirm order
      </Text>
      <PaymentConfirmDetails />
      <CartContent icons={false} width='100%' />
      <Elements stripe={stripe}>
        <PaymentConfirmCard loadHandler={setLoading} setHandler={setHandler} />
      </Elements>
      <PaymentConfirmControls
        confirmHandler={handler.confirmHandler}
        complete={handler.complete}
        loadHandler={handler.loadHandler}
      />
    </Flex>
  ) : (
    <Spinner data-testid='confirm-spinner' text='Loading data...' />
  );
};

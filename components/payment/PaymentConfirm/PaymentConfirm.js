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

const stripe = /* istanbul ignore next */ loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || 'test'
);

/**
 * Wrapper component for the confirm stage elements. See
 * [PaymentConfirmControls](#paymentconfirmcontrols) for
 * details about the next stages after *confirm* step.
 *
 * @visibleName Payment Confirm
 * @example
 * ```jsx
 * <PaymentConfirm />
 * ```
 */
export const PaymentConfirm = (props) => {
  const { details } = useSelector((store) => store.payment);
  const [loading, setLoading] = React.useState(false);
  const [handler, setHandler] = React.useState({
    complete: false,
    confirmHandler: /* istanbul ignore next */ () => {},
  });

  return (
    <>
      <Flex
        d={!loading ? 'flex' : 'none'}
        flexDirection='column'
        alignItems='center'
        width='100%'
        {...props}
      >
        <Heading data-testid='confirm-intent-name' my='1rem'>
          {`Hello, ${details.name}!`}
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
          complete={handler.complete && !!details}
          loadHandler={setLoading}
        />
      </Flex>
      <Spinner d={loading ? 'flex' : 'none'} data-testid='confirm-spinner' text='Loading data...' />
    </>
  );
};

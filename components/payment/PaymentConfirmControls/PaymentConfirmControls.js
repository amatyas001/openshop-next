import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { SimpleGrid } from '@chakra-ui/core';
import { paymentCancel } from '@app/redux/actions';
import { Button } from '@app/components';

/**
 * Displays control buttons for [PaymentConfirm](#paymentconfirm).
 *
 * **Confirm**
 * > Calls the passed `confirmHandler` function from [PaymentConfirmCard](#paymentconfirmcard) 
 * to dispatch confirm request and loads [PaymentSuccess](#paymentsuccess) or 
 * [PaymentError](#paymenterror) according to the response from *Stripe API*
 *
 * **Cancel**
 * > Dispatch cancel action which loads [PaymentCancelled](#paymentcancelled) stage.
 *
 * ***State Dependencies***
 * - `payment.status === 'confirm'`
 * - `payment.intent`
 * 
 * @example
 * ```jsx
 * <PaymentConfirmControls
    confirmHandler={confirmFunction}
    complete={cardState}
    loadHandler={setLoading}
  />
 * ```
 */
export const PaymentConfirmControls = (props) => {
  const { confirmHandler, loadHandler, complete } = props;
  const { payment = {} } = useSelector((state) => state);
  const { intent = {} } = payment;
  const dispatch = useDispatch();

  return (
    <SimpleGrid columns='2' spacing='15px' width='90%' {...props}>
      <Button
        data-testid='confirm-controls-cancel'
        width='100%'
        bg='white'
        borderColor='red.600'
        color='red.600'
        _hover={{
          bg: 'red.600',
          color: 'gray.100',
        }}
        onClick={() => {
          loadHandler(true);
          dispatch(paymentCancel(intent.id));
        }}
      >
        CANCEL ORDER
      </Button>
      <Button
        data-testid='confirm-controls-confirm'
        width='100%'
        bg='purple.800'
        color='gray.100'
        disabled={!complete}
        onClick={confirmHandler}
      >
        CONFIRM ORDER
      </Button>
    </SimpleGrid>
  );
};

PaymentConfirmControls.propTypes = {
  /**
   * Handler to be called on clicking confrim
   */
  confirmHandler: PropTypes.func.isRequired,

  /**
   * Setter for loading state in [PaymentConfirm](#paymentconfirm)
   */
  loadHandler: PropTypes.func.isRequired,

  /**
   * Actual [CardElement](https://stripe.com/docs/stripe-js) state.
   * See [PaymentConfirmCard](#paymentconfirmcard) for details.
   */
  complete: PropTypes.bool.isRequired,
};

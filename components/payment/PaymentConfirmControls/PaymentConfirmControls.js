import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { SimpleGrid } from '@chakra-ui/core';
import { paymentCancel } from '@app/lib/redux/actions';
import { Button } from '@app/components';

/**
 * @see https://amatyas001.github.io/openshop-next/#paymentconfirm
 * @ignore
 */
export const PaymentConfirmControls = (props) => {
  const { confirmHandler, loadHandler, complete } = props;
  const { intent } = useSelector((state) => state.payment);
  const dispatch = useDispatch();

  return (
    <SimpleGrid columns='2' spacing='15px' width='90%' {...props}>
      <Button
        data-testid='confirm-controls-cancel'
        variant='danger'
        onClick={() => {
          loadHandler(true);
          dispatch(paymentCancel(intent.id));
        }}
      >
        CANCEL ORDER
      </Button>
      <Button data-testid='confirm-controls-confirm' disabled={!complete} onClick={confirmHandler}>
        CONFIRM ORDER
      </Button>
    </SimpleGrid>
  );
};

PaymentConfirmControls.propTypes = {
  /**
   * Confirm handler function from controls
   */
  confirmHandler: PropTypes.func.isRequired,

  /**
   * Loading state handler
   */
  loadHandler: PropTypes.func.isRequired,

  /**
   * Card element status
   */
  complete: PropTypes.bool.isRequired,
};

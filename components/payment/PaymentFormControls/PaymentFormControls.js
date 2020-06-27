import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, SimpleGrid, Text } from '@chakra-ui/core';
import { paymentIntent, paymentReview } from '@app/redux/actions';
import { Button } from '@app/components';

/**
 * Displays control buttons for [PaymentForm](#paymentform) giving the user options to go back
 * [PaymentReview](#paymentreview) stage or *submit* form data *(this is disabled by default)*.
 *
 * When passed details are valid, *submit* button becomes active and renders the amount to be charged.
 * On submitting the form it will send request to *Stripe API* for creating an intent and loads
 * [PaymentConfirm](#paymentconfirm) stage to continue process.
 *
 * ***State Dependencies***
 * - `payment.token`
 * - `amount`
 * - `cart`
 *
 * @example
 * ```jsx
 * <PaymentFormControls details={formDetails} setLoading={setLoading}>
 *```
 */
export const PaymentFormControls = (props) => {
  const { details, setLoading } = props;
  const { amount = 0, payment = {}, cart = [] } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [valid, setValid] = React.useState(false);

  React.useEffect(() => {
    setValid(() => {
      let isValid = true;
      Object.values(details).forEach((item) => {
        if (item === '') isValid = false;
      });
      return isValid;
    });
  }, [details]);

  const handleSubmit = () => {
    if (!valid) return;
    setLoading(true);
    dispatch(paymentIntent(details, cart, payment.token));
  };

  return (
    <>
      <Text
        fontStyle='italic'
        textTransform='uppercase'
        fontSize='0.8rem'
        textAlign='center'
      >
        By proceeding you accept the{' '}
        <Link color='purple.800' fontWeight='bold'>
          Terms of Service
        </Link>{' '}
        of the company.
      </Text>
      <SimpleGrid
        columns={{ sm: 1, md: 2 }}
        spacing='20px'
        width='80%'
        mx='auto'
        mb='15px'
      >
        <Button
          data-testid='form-review-button'
          bg='gray.600'
          color='gray.100'
          width='100%'
          type='button'
          onClick={() => dispatch(paymentReview())}
        >
          BACK TO REVIEW
        </Button>
        <Button
          data-testid='form-submit-button'
          bg='purple.800'
          color='gray.100'
          width='100%'
          disabled={!valid}
          onClick={handleSubmit}
        >
          {!valid ? 'FILL THE FORM' : `PAY ${amount} $`}
        </Button>
      </SimpleGrid>
    </>
  );
};

PaymentFormControls.propTypes = {
  /**
   * Details from [PaymentForm](#paymentform)
   */
  details: PropTypes.object.isRequired,

  /**
   * Loading handler to lift loading state
   */
  setLoading: PropTypes.func.isRequired,
};

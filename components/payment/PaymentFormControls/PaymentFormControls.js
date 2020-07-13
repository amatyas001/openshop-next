import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, SimpleGrid, Text } from '@chakra-ui/core';
import { paymentCreate, paymentReview } from '@app/lib/redux/actions';
import { Button } from '@app/components';

/**
 * @see https://amatyas001.github.io/openshop-next/#paymentform
 * @ignore
 */
export const PaymentFormControls = (props) => {
  const { details, setLoading } = props;
  const { payment, cart } = useSelector((state) => state);
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
    dispatch(paymentCreate(details, cart, payment.token));
  };

  return (
    <>
      <Text
        fontStyle='italic'
        textTransform='uppercase'
        fontSize='0.8rem'
        textAlign='center'
      >
        By proceeding you accept the
        <Link color='purple.800' fontWeight='bold' href='#void'>
          &nbsp;Terms of Service&nbsp;
        </Link>
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
          variant='secondary'
          onClick={() => dispatch(paymentReview())}
        >
          BACK TO REVIEW
        </Button>
        <Button
          data-testid='form-submit-button'
          disabled={!valid}
          onClick={handleSubmit}
        >
          {!valid
            ? 'FILL THE FORM'
            : `PAY ${cart
                .reduce((a, c) => a + parseFloat(c.price) * c.buy.amount, 0)
                .toFixed(2)} $`}
        </Button>
      </SimpleGrid>
    </>
  );
};

PaymentFormControls.propTypes = {
  /**
   * Form details
   */
  details: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,

  /**
   * Loading handler
   */
  setLoading: PropTypes.func.isRequired,
};

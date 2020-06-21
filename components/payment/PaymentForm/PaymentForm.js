import { useDispatch, useSelector } from 'react-redux';
import { CardElement, useStripe } from '@stripe/react-stripe-js';
import { Box, Flex, Heading, Link, SimpleGrid, Text } from '@chakra-ui/core';
import { paymentIntent, paymentReview } from '@app/redux/actions';
import { Button, Field, Spinner } from '@app/components';

// Handle user data and send request to Stripe
export const PaymentForm = (props) => {
  const stripe = useStripe();
  const dispatch = useDispatch();
  const { amount = 0, payment = {}, cart = [] } = useSelector((state) => state);

  const [loading, setLoading] = React.useState(false);
  const [cardError, setCardError] = React.useState(null);
  const [cardComplete, setCardComplete] = React.useState(false);
  const [valid, setValid] = React.useState(false);
  const [details, setDetails] = React.useState({
    email: '',
    phone: '',
    name: '',
    address: '',
  });

  React.useEffect(() => {
    if (payment.status !== 'form') {
      setLoading(false);
      setDetails({
        email: '',
        phone: '',
        name: '',
        address: '',
      });
    }
  }, [payment]);

  // validate form
  React.useEffect(() => {
    setValid(isFormValid(details, cardComplete));
  }, [details, cardComplete]);

  //validator
  const isFormValid = (items, card) => {
    let isValid = true;
    Object.values(items).forEach((item) => {
      if (item === '') isValid = false;
    });
    return card && isValid;
  };

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!valid) return;
    setLoading(true);
    dispatch(paymentIntent(details, cart, payment.token));
  };

  const fields = [
    {
      name: 'name',
      type: 'text',
      placeholder: 'John Doe',
    },
    {
      name: 'address',
      type: 'text',
      placeholder: 'J191 S. Illinois Street, Everett, MA 02149',
    },
    ,
    {
      name: 'email',
      type: 'email',
      placeholder: 'johndoe@example.com',
    },
    { name: 'phone', type: 'tel', placeholder: '(941) 555-0123' },
  ];

  return (
    <>
      {/* payment form */}
      <Flex
        as='form'
        flexDirection='column'
        alignItems='center'
        mx='auto'
        aria-hidden={payment.status !== 'form'}
        width={{ sm: '100%', lg: '80%' }}
        d={payment.status === 'form' && !loading ? 'flex' : 'none'}
        {...props}
      >
        <Box
          as='fieldset'
          border='0'
          width='100%'
          mb='10px'
          borderBottom='1px'
          borderColor='gray.400'
        >
          {
            /* fileds */
            fields.map((item) => (
              <Field
                key={item.name}
                label={item.name}
                id={item.name}
                type={item.type}
                placeholder={item.placeholder}
                required
                value={details[item.name]}
                onChange={(e) => {
                  setDetails({ ...details, [item.name]: e.target.value });
                }}
              />
            ))
          }

          {/* card info */}
          <Flex alignItems='center'>
            {/* label */}
            <Heading
              as='label'
              htmlFor='StripeElement'
              fontSize='1.5rem'
              alignSelf='start'
            >
              card
            </Heading>

            {/* testing */}
            <Text
              mt='-7px'
              mb='-7px'
              p='7px'
              fontSize='0.8rem'
              color='gray.600'
            >
              Use any future date and CVC with{' '}
              <strong>4242 4242 4242 4242</strong> number for testing
            </Text>

            {/* error */}
            <Text
              d={cardError ? 'inline-block' : 'none'}
              ml='auto'
              mt='-7px'
              mb='-7px'
              p='7px'
              fontSize='1rem'
              fontWeight='bold'
              bg='red.400'
              borderRadius='5px'
              color='gray.100'
              data-testid='form-card-error'
            >
              {cardError && cardError.message}
            </Text>
          </Flex>

          {/* card element */}
          {stripe ? (
            <CardElement
              data-testid='cardElement'
              options={{
                hidePostalCode: true,
                iconStyle: 'solid',
                style: {
                  base: {
                    border: '1px solid black',
                    iconColor: '#1A202C',
                    color: '#1A202C',
                    fontWeight: 500,
                    fontFamily: 'Montserrat, Open Sans, Segoe UI, sans-serif',
                    fontSize: '16px',
                    fontSmoothing: 'antialiased',
                    ':-webkit-autofill': { color: '#fce883' },
                    '::placeholder': { color: '#4A5568' },
                  },
                  invalid: {
                    iconColor: '##C53030',
                    color: '#f#C53030',
                  },
                },
              }}
              onChange={(e) => {
                setCardError(e.error);
                setCardComplete(e.complete);
              }}
            />
          ) : (
            <Spinner size='20px' mx='auto' />
          )}
        </Box>

        {/* ToS info */}
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

        {/* controls */}
        <SimpleGrid
          columns={{ sm: 1, md: 2 }}
          spacing='20px'
          width='80%'
          mx='auto'
          mb='15px'
        >
          {/* review button */}
          <Button
            data-testid='review-button'
            bg='gray.600'
            color='gray.100'
            width='100%'
            type='button'
            onClick={() => dispatch(paymentReview())}
          >
            BACK TO REVIEW
          </Button>

          {/* confirm button */}
          <Button
            data-testid='submit-button'
            bg='purple.800'
            color='gray.100'
            width='100%'
            type='submit'
            disabled={!valid}
            onClick={handleSubmit}
          >
            {!valid ? 'FILL THE FORM' : `PAY ${amount} $`}
          </Button>
        </SimpleGrid>
      </Flex>
      {payment.status === 'form' && loading && (
        <Spinner data-testid='form-spinner' text='Sending data...' />
      )}
    </>
  );
};

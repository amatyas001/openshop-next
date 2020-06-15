import { CardElement, useStripe } from '@stripe/react-stripe-js';
import {
  Box,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Spinner,
  Text,
} from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { paymentIntent, paymentReview } from '../../redux/actions';
import { Button, Field } from '../index';

// Handle user data and send request to Stripe
export const PaymentForm = (props) => {
  const stripe = useStripe();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [cardError, setCardError] = React.useState(null);
  const [cardComplete, setCardComplete] = React.useState(false);
  const [valid, setValid] = React.useState(false);
  const [details, setDetails] = React.useState({
    email: '',
    phone: '',
    name: '',
    address: '',
  });

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
    if (!cardComplete) return;
    dispatch(paymentIntent(details, state.cart, state.payment.token));
  };

  return (
    <>
      {/* payment form */}
      <Flex as='form' flexDirection='column' alignItems='center' {...props}>
        <Box
          as='fieldset'
          border='0'
          width='100%'
          mb='10px'
          borderBottom='1px'
          borderColor='gray.400'
        >
          {/* name */}
          <Field
            label='name'
            id='name'
            type='text'
            placeholder='Jane Doe'
            required
            autoComplete='name'
            value={details.name}
            onChange={(e) => {
              setDetails({ ...details, name: e.target.value });
            }}
          />

          {/* address */}
          <Field
            label='address'
            id='address'
            type='text'
            placeholder='J191 S. Illinois Street, Everett, MA 02149'
            required
            autoComplete='address'
            value={details.address}
            onChange={(e) => {
              setDetails({ ...details, address: e.target.value });
            }}
          />

          {/* email */}
          <Field
            label='email'
            id='email'
            type='email'
            placeholder='janedoe@gmail.com'
            required
            autoComplete='email'
            value={details.email}
            onChange={(e) => {
              setDetails({ ...details, email: e.target.value });
            }}
          />

          {/* phone */}
          <Field
            label='phone'
            id='phone'
            type='tel'
            placeholder='(941) 555-0123'
            required
            autoComplete='tel'
            value={details.phone}
            onChange={(e) => {
              setDetails({ ...details, phone: e.target.value });
            }}
          />

          {/* card */}
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

            {/* test info */}
            <Text
              mt='-7px'
              mb='-7px'
              p='7px'
              fontSize='0.8rem'
              color='gray.600'
            >
              Use any date and CVC with <strong>4242 4242 4242 4242</strong>{' '}
              number for testing
            </Text>

            {/* error display */}
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
            >
              {cardError && cardError.message}
            </Text>
          </Flex>

          {/* card element */}
          {stripe ? (
            <CardElement
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
        <Text fontStyle='italic' textTransform='uppercase' fontSize='0.8rem'>
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
          mb='15px'
        >
          {/* review button */}
          <Button
            bg='gray.600'
            color='gray.100'
            width='100%'
            onClick={() => dispatch(paymentReview())}
          >
            BACK TO REVIEW
          </Button>

          {/* confirm button */}
          <Button
            bg='purple.800'
            color='gray.100'
            width='100%'
            disabled={!valid}
            onClick={handleSubmit}
          >
            {!valid ? 'FILL THE FORM' : `PAY ${state.amount} $`}
          </Button>
        </SimpleGrid>
      </Flex>
    </>
  );
};

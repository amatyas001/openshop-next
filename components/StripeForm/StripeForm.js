import { intentCart, checkoutReview } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Text, Link, Heading, Box, Spinner } from '@chakra-ui/core';
import { Button, Field } from '../index';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FaStripe } from 'react-icons/fa';

export const StripeForm = () => {
  const stripe = useStripe();
  const elements = useElements();
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

  React.useEffect(() => {
    setValid(isFormValid(details, cardComplete));
  }, [details, cardComplete]);

  const isFormValid = (items, card) => {
    let isValid = true;
    Object.values(items).forEach((item) => {
      if (item === '') isValid = false;
    });
    return card && isValid;
  };

  const handleSubmit = (e) => {
    if (!cardComplete) return;
    const card = elements.getElement(CardElement);
    dispatch(intentCart(card, details, state.cart));
  };

  return (
    <>
      {stripe ? (
        <Flex as='form' flexDirection='column' alignItems='center' width='100%'>
          <Box
            as='fieldset'
            border='0'
            width='100%'
            mb='10px'
            borderBottom='1px'
            borderColor='gray.400'
          >
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

            <Flex alignItems='center'>
              <Heading
                as='label'
                htmlFor='StripeElement'
                fontSize='1.5rem'
                alignSelf='start'
              >
                card
              </Heading>
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
          </Box>
          <Text fontStyle='italic' textTransform='uppercase' fontSize='0.8rem'>
            By clicking the{' '}
            <Text as='span' color='purple.800' fontWeight='bold' p='5px'>
              PAY
            </Text>{' '}
            button you will accept the{' '}
            <Link color='purple.800' fontWeight='bold'>
              Terms of Service
            </Link>{' '}
            of the company.
          </Text>
          <Button
            bg='gray.600'
            color='gray.100'
            width={{ sm: '90%', md: '70%', lg: '60%' }}
            onClick={() => dispatch(checkoutReview())}
          >
            BACK TO REVIEW
          </Button>
          <Button
            bg='purple.800'
            color='gray.100'
            width={{ sm: '90%', md: '70%', lg: '60%' }}
            isDisabled={!valid}
            onClick={handleSubmit}
          >
            {!valid ? (
              <Text as='span' mx='auto'>
                FILL THE FORM
              </Text>
            ) : (
              <>
                <Text as='span' mx='auto'>
                  PAY {state.amount}&nbsp;$
                </Text>
                <Text
                  position='absolute'
                  right='53px'
                  top='10px'
                  fontSize='0.6rem'
                >
                  powered by
                </Text>
                <Text
                  position='absolute'
                  right='10px'
                  fontSize='2.5rem'
                  as={FaStripe}
                />
              </>
            )}
          </Button>
        </Flex>
      ) : (
        <Spinner size='150px' my='50px' />
      )}
    </>
  );
};

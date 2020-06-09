import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  Spinner,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  useDisclosure,
} from '@chakra-ui/core';
import { Button } from '../index';
import { useDispatch, useSelector } from 'react-redux';
import {
  cancelPayment,
  paymentError,
  paymentSuccess,
  clearCart,
} from '../../redux/actions';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { CartItems } from '../index';

export const StripeConfirm = () => {
  const cancelRef = React.useRef();
  const { onClose } = useDisclosure();
  const elements = useElements();
  const { payment } = useSelector((state) => state);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const [isOpen, setIsOpen] = React.useState(true);

  const handleConfirm = async () => {
    if (stripe) {
      let intent;
      const card = elements.getElement(CardElement);
      intent = await stripe.confirmCardPayment(payment.intent.secret, {
        payment_method: {
          card: card,
          billing_details: {
            name: payment.details.name,
            email: payment.details.email,
            phone: payment.details.phone,
          },
        },
      });
      if (intent.paymentIntent && intent.paymentIntent.status === 'succeeded') {
        dispatch(clearCart());
        dispatch(paymentSuccess(intent.paymentIntent.id));
      }
      if (intent.error) {
        dispatch(paymentError(intent.error.message));
      }
    }
    return;
  };

  return (
    payment.status === 'confirm' && (
      <>
        <AlertDialog
          onClose={onClose}
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
        >
          <AlertDialogOverlay />
          <AlertDialogContent
            minWidth={{ sm: '90%', md: '70%', lg: '60%', xl: '50%' }}
            minHeight='400px'
            height='auto'
          >
            {payment ? (
              <>
                <AlertDialogBody>
                  <Heading>hey {payment.details.name}!</Heading>
                  <Text fontSize='1.1rem' fontWeight='bold'>
                    Please review your payment details:
                  </Text>
                  <SimpleGrid
                    columns={{ sm: 1, lg: 2 }}
                    borderTop='1px'
                    borderBottom='1px'
                  >
                    <SimpleGrid
                      columns='2'
                      spacing='10px'
                      fontSize='0.9rem'
                      fontWeight='bold'
                      flexDirection='column'
                      p='3%'
                    >
                      <Text>INTENT ID</Text>
                      <Text color='purple.800'>{payment.intent.id}</Text>
                      <Text>EMAIL</Text>
                      <Text color='purple.800'>{payment.details.email}</Text>
                      <Text>PHONE</Text>
                      <Text color='purple.800'>{payment.details.phone}</Text>
                      <Text>ADDRESS</Text>
                      <Text color='purple.800'>{payment.details.address}</Text>
                    </SimpleGrid>
                    <Flex flexDirection='column' mt='auto'>
                      <CartItems />
                    </Flex>
                  </SimpleGrid>
                </AlertDialogBody>
                <Flex
                  alignItems='center'
                  py='15px'
                  justifyContent='space-around'
                >
                  <Button
                    width='40%'
                    bg='red.500'
                    color='gray.100'
                    ref={cancelRef}
                    onClick={() => dispatch(cancelPayment(payment.intent.id))}
                  >
                    CANCEL ORDER
                  </Button>
                  <Button
                    width='40%'
                    bg='purple.800'
                    color='gray.100'
                    onClick={handleConfirm}
                  >
                    CONFIRM ORDER
                  </Button>
                </Flex>
              </>
            ) : (
              <Spinner size='100px' m='auto' />
            )}
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  );
};

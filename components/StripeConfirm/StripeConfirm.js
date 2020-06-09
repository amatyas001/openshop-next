import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Spinner,
  useDisclosure,
} from '@chakra-ui/core';
import { Button } from '../index';
import { useDispatch, useSelector } from 'react-redux';
import {
  cancelPayment,
  paymentStart,
  paymentError,
  paymentSuccess,
  clearCart,
} from '../../redux/actions';
import { useStripe } from '@stripe/react-stripe-js';

export const StripeConfirm = () => {
  const cancelRef = React.useRef();
  const { onClose } = useDisclosure();
  const payment = useSelector((state) => state.payment);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const [isOpen, setIsOpen] = React.useState(true);

  const handleConfirm = async () => {
    if (stripe)
      try {
        dispatch(paymentStart());
        const result = await stripe.confirmCardPayment(payment.intent.secret, {
          payment_method: {
            card: payment.card,
            billing_details: {
              name: payment.details.name,
              email: payment.details.email,
              phone: payment.details.phone,
            },
          },
        });

        if (
          result.paymentIntent &&
          result.paymentIntent.status === 'succeeded'
        ) {
          dispatch(clearCart());
          setIsOpen(false);
          dispatch(paymentSuccess(result.paymentIntent.id));
        }
      } catch (e) {
        setIsOpen(false);
        dispatch(paymentError(e.message));
      }
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
          <AlertDialogContent>
            {payment ? (
              <>
                {' '}
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                  Confirm Payment
                </AlertDialogHeader>
                <AlertDialogBody>
                  Hey {payment.details.name}, Your order intent is processed by
                  the server and ready to go!
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button
                    bg='pink,200'
                    color='gray.800'
                    ref={cancelRef}
                    onClick={() => {
                      dispatch(cancelPayment(payment.intent));
                    }}
                  >
                    CANCEL ORDER
                  </Button>
                  <Button
                    bg='purple.800'
                    color='gray.100'
                    onClick={handleConfirm}
                  >
                    CONFIRM ORDER
                  </Button>
                </AlertDialogFooter>
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

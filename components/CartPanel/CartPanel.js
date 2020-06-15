import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { paymentReview } from '../../redux/actions';
import { Collapse, Flex, Heading, Text, SimpleGrid } from '@chakra-ui/core';
import { Button, CartContent } from '../index';
import { MdShoppingCart } from 'react-icons/md';

export const CartPanel = (props) => {
  const [show, setShow] = React.useState(false);
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <Flex
      as={'section'}
      role='complementary'
      id='cart'
      flexDirection='column'
      {...props}
    >
      {/* cart button */}
      <Button
        as={'a'}
        role='button'
        d='inline-block'
        width='30px'
        ml='auto'
        aria-controls='cart-holder'
        backgroundColor='transparent'
        color='gray.800'
        border='0'
        onClick={() => setShow(!show)}
        id='card-toggler'
        _hover={{
          bg: '',
          color: 'purple.400',
        }}
        _active={{
          color: 'purple.200',
        }}
      >
        <Text mb='-4px' fontSize='1.7rem' as={MdShoppingCart} />
      </Button>

      {cart && (
        <>
          {/* item count icon */}
          <Text
            as='span'
            d={cart.length ? 'block' : 'none'}
            w='20px'
            h='20px'
            position='absolute'
            top='5px'
            right='10px'
            bg='purple.600'
            borderRadius='50%'
            textAlign='center'
            fontSize='1rem'
            color='gray.100'
            fontWeight='bold'
          >
            {cart.length}
          </Text>

          {/* panel */}
          <Collapse
            isOpen={show}
            position='fixed'
            top='60px'
            right='0'
            width={{ sm: '100%', md: '70%', lg: '60%', xl: '40%' }}
            bg='white'
            border='1px'
            borderTop='0'
            borderColor='purple.400'
            boxShadow='2px 7px 7px black'
            px='10px'
            py='5px'
          >
            {/* items */}
            {cart.length ? (
              <CartContent />
            ) : (
              <Heading textAlign='center'>no items in your cart</Heading>
            )}

            <SimpleGrid columns='2' spacing='15px'>
              {/* close button */}
              <Button
                onClick={() => setShow(false)}
                bg='gray.200'
                color='purple.600'
                width='100%'
                mr='15px'
              >
                close
              </Button>

              {/* checkout button */}
              <Link href='/checkout' passHref>
                <Button
                  onClick={() => {
                    setShow(false);
                    dispatch(paymentReview());
                  }}
                  bg='purple.800'
                  color='gray.200'
                  width='100%'
                >
                  continue
                </Button>
              </Link>
            </SimpleGrid>
          </Collapse>
        </>
      )}
    </Flex>
  );
};

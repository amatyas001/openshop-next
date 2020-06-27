import PropTypes from 'prop-types';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { MdShoppingCart } from 'react-icons/md';
import {
  Box,
  Collapse,
  Flex,
  Heading,
  Text,
  SimpleGrid,
} from '@chakra-ui/core';
import { paymentReview } from '@app/redux/actions';
import { Button, CartContent } from '@app/components';

/**
 * Wrapper component for the cart. Displays the cart button
 * and a fixed position collapse menu containing the cart content.
 *
 * When the cart is empty it renders *"no items in your cart"* text.
 *
 * At the bottom, the component displays the cart control buttons
 * used to close the panel and initiate payment process.
 *
 * ***State Dependencies***
 * - `cart`
 *
 * ***Wrapped Components***
 * - [CartContent](#cartcontent)
 *
 * @example
 * ```jsx
 * <CartPanel
 *  panel={stylePropsObject}
 *  icon={<CustomIcon />}
 *  indicator={<CustomIndicator />}
 *  close={customStyles}
 *  continue={customStlyes}
 * />
 * ```
 */
export const CartPanel = (props) => {
  const [show, setShow] = React.useState(false);
  const { cart = [] } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <Flex
      as={'section'}
      role='complementary'
      id='cart'
      flexDirection='column'
      {...props}
    >
      {/* icon button */}
      <Button
        as={'a'}
        role='button'
        d='inline-block'
        width='30px'
        ml='auto'
        aria-label='cart-toggler'
        backgroundColor='transparent'
        color='gray.800'
        border='0'
        onClick={() => setShow(!show)}
        id='cart-toggler'
        _hover={{
          bg: '',
          color: 'purple.400',
        }}
        _active={{
          color: 'purple.200',
        }}
      >
        {props.icon || <Box mb='-4px' fontSize='1.7rem' as={MdShoppingCart} />}
      </Button>
      {/* indicator */}
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
        {...props.indicator}
      >
        {cart.length}
      </Text>

      {/* panel */}
      <Collapse
        isOpen={show}
        position='fixed'
        top='60px'
        right='0'
        width={{
          sm: '100%',
          md: '70%',
          lg: '60%',
          xl: '40%',
        }}
        bg='white'
        border='1px'
        borderTop='0'
        borderColor='purple.400'
        boxShadow='2px 7px 7px black'
        px='2%'
        py='5px'
        {...props.panel}
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
            {...props.close}
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
              {...props.continue}
            >
              continue
            </Button>
          </Link>
        </SimpleGrid>
      </Collapse>
    </Flex>
  );
};

CartPanel.defaultProps = {
  panel: null,
  indicator: null,
  icon: null,
  close: null,
  continue: null,
};

CartPanel.propTypes = {
  /**
   * [Style Props](https://chakra-ui.com/style-props) for collapsable panel
   */
  panel: PropTypes.object,

  /**
   * [Style Props](https://chakra-ui.com/style-props) for indicator
   */
  indicator: PropTypes.object,

  /**
   * Custom element for cart icon
   */
  icon: PropTypes.element,

  /**
   * [Style Props](https://chakra-ui.com/style-props) for close button
   */
  close: PropTypes.element,

  /**
   * [Style Props](https://chakra-ui.com/style-props) for continue button
   */
  continue: PropTypes.object,
};

import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Heading } from '@chakra-ui/core';
import { getAmount } from '@app/redux/actions';
import { CartItem } from '@app/components';

/**
 * Displays cart items and their total price.
 *
 * ***State Dependencies***
 * - `cart`
 * - `amount`
 *
 * ***Wrapped Components***
 * - [CartItem](#cartitem)
 *
 * @example
 * ```jsx
 * <CartContent text={textStyles} amount={amountStyles} icons={true} />
 * ```
 */
export const CartContent = (props) => {
  const { icons, text, price } = props;
  const { cart, amount } = useSelector((state) => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAmount());
  }, [cart]);

  return (
    <Box as='section' {...props}>
      <Box as='ul' role='list'>
        {cart &&
          cart.map((item) => (
            <CartItem
              key={item.id}
              role='listitem'
              as='li'
              item={item}
              icons={icons}
            />
          ))}
      </Box>

      <Box as='footer'>
        <Heading
          as='p'
          textAlign='right'
          fontSize='1.5rem'
          fontWeight='bold'
          color='purple.500'
          pt='10px'
          my='0'
          borderTop='1px'
          {...text}
        >
          TOTAL PRICE
        </Heading>

        <Heading as='strong' d='block' textAlign='right' my='0' {...price}>
          {amount}&nbsp;$
        </Heading>
      </Box>
    </Box>
  );
};

CartContent.defaultProps = {
  text: null,
  price: null,
  icons: true,
};

CartContent.propTypes = {
  /**
   * [Style Props](https://chakra-ui.com/style-props) for the total price text
   */
  text: PropTypes.object,

  /**
   * [Style Props](https://chakra-ui.com/style-props) for the price text
   */
  price: PropTypes.object,

  /**
   * Toggle displaying item icons
   */
  icons: PropTypes.bool,
};

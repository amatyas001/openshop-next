import { useSelector } from 'react-redux';
import { Box, Heading } from '@chakra-ui/core';
import * as COLORS from '@app/config';

/**
 * Renders the total amount of products added to the cart
 *
 * @see https://amatyas001.github.io/openshop-next/#cartpanel
 */
export const CartAmount = (props) => {
  const { cart } = useSelector((state) => state);
  return (
    <Box {...props}>
      <Heading
        as='p'
        textAlign='right'
        fontSize='1.5rem'
        fontWeight='bold'
        color={COLORS.HEADING.light}
        borderColor={COLORS.SPACER.light}
        my='0'
      >
        TOTAL
      </Heading>

      <Heading as='strong' d='block' textAlign='right' my='0' data-testid='cart-amount-value'>
        {cart
          .reduce((a, c) => {
            return a + parseFloat(c.price) * c.buy.amount;
          }, 0)
          .toFixed(2)}
        &nbsp;$
      </Heading>
    </Box>
  );
};

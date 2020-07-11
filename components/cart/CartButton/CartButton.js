import { useSelector, useDispatch } from 'react-redux';
import { MdShoppingCart } from 'react-icons/md';
import { Button } from '@app/components';
import { panelToggle } from '@app/lib/redux/actions';
import * as COLORS from '@app/config/colors';

/**
 * Controls the visibility of the actual cart
 *
 * @see https://amatyas001.github.io/openshop-next/#cartpanel
 */
export const CartButton = (props) => {
  const { cart, panel } = useSelector((store) => store);
  const dispatch = useDispatch();
  return (
    <Button
      fontSize='1.5rem'
      variant='transparent'
      ml='auto'
      aria-label='cart-toggler'
      border='0'
      onClick={() => dispatch(panelToggle('cart', !panel.cart))}
      id='cart-toggler'
      bg={COLORS.BUTTON.transparent.base}
      color={COLORS.BUTTON.primary.base}
      _hover={{
        ...COLORS.BUTTON.transparent.hover,
        color: COLORS.BUTTON.primary.hover.bg,
        textDecoration: 'none',
        cursor: 'pointer',
      }}
      _focus={{
        ...COLORS.BUTTON.transparent.hover,
        color: COLORS.BUTTON.primary.hover.bg,
        textDecoration: 'none',
      }}
      _select={{
        ...COLORS.BUTTON.transparent.hover,
        color: COLORS.BUTTON.primary.hover.bg,
        textDecoration: 'none',
      }}
      _active={{
        ...COLORS.BUTTON.transparent.hover,
        color: COLORS.BUTTON.primary.hover.bg,
        textDecoration: 'none',
      }}
      {...props}
    >
      <MdShoppingCart style={{ marginBottom: '-5px', marginRight: '5px' }} />
      {cart.reduce((a, c) => (a += c.buy.amount), 0) + ' item(s)'}
    </Button>
  );
};

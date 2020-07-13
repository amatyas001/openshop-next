import PropTypes from 'prop-types';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { Flex } from '@chakra-ui/core';
import { paymentReview, panelToggle } from '@app/lib/redux/actions';
import { Button, CartContent, CartButton, CartAmount, Panel } from '@app/components';
import * as COLORS from '@app/config/colors';

/**
 * Represents the actual user cart containing list of products which
 * are selected to checkout. Rendered as a fixed position collapsable
 * [Panel](https://amatyas001.github.io/openshop-next/#panel)
 * controlled by a buttom in the main navigation.
 *
 * When a new product is added to the cart, it will be added as the first item
 * in the list. If more amount is added with the same details of a product that
 * already present, then the amount is updated according to the given values.
 *
 * @visibleName Shopping Cart
 * @example
 * ```jsx
 * <CartPanel />
 * ```npm
 */
export const CartPanel = (props) => {
  const { width } = props;
  const { cart, panel } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <Flex as='section' role='complementary' id='cart' flexDirection='column' {...props}>
      <CartButton data-testid='cart-panel-button' />
      <Panel
        toggle={panel.cart}
        position='fixed'
        top='60px'
        right='0'
        width={
          width || {
            sm: '96%',
            md: '70%',
            lg: '60%',
            xl: '40%',
          }
        }
        bg='white'
        boxShadow='2px 7px 7px black'
        px='2%'
        pb='10px'
        pt='0'
        overflow='auto'
        border='0'
      >
        <Flex
          position='fixed'
          right='2%'
          width={
            width || {
              sm: '100%',
              md: '70%',
              lg: '60%',
              xl: '40%',
            }
          }
          alignItems='center'
          justifyContent='space-between'
          pb='10px'
          bg='white'
          borderBottom='2px'
          borderColor={COLORS.SPACER.light}
        >
          <Button
            data-testid='cart-panel-button-close'
            width='20%'
            onClick={() => dispatch(panelToggle('cart', false))}
            variant='secondary'
            mr='15px'
          >
            close
          </Button>
          <Link href='/checkout' passHref>
            <Button
              data-testid='cart-panel-button-continue'
              mx='auto'
              width='50%'
              disabled={!cart.length}
              onClick={() => {
                dispatch(panelToggle('cart', false));
                dispatch(paymentReview());
              }}
            >
              continue
            </Button>
          </Link>
          <CartAmount data-testid='cart-panel-amount' width='20%' />
        </Flex>
        <CartContent icons data-testid='cart-panel-content' pt='80px' />
      </Panel>
    </Flex>
  );
};

CartPanel.defaultProps = {
  width: '100%',
};

CartPanel.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

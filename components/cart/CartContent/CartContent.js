import PropTypes from 'prop-types';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Heading } from '@chakra-ui/core';
import { getAmount } from '@app/redux/actions';
import { CartItem } from '@app/components';

/**
 * Displays all cart items and their total price below the list.
 *
 * On mounting the `browserHistoryChange` listener is attached to `Router`
 * to handle prefetching item routes before actual route changing happens.
 * This technique provides loading inidividual item details page without
 * a full refresh which triggered by default.
 *
 * Total price is recalculated when the actual cart content is changing.
 *
 * > ***State***
 * > - `amount`
 *
 * > ***Elements***
 * > - [CartItem](#cartitem)
 *
 * @example
 * ```jsx
 * <CartContent text={textStyles} amount={amountStyles} />
 * ```
 */
export const CartContent = (props) => {
  const { cart, amount } = useSelector((state) => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const prefetchRoutes = (url) => {
      url.match(/^\/item\/[\w]*$/gi) && Router.prefetch('/items/[id]', url);
    };
    Router.events.on('beforeHistoryChange', prefetchRoutes);
    return () => {
      Router.events.off('beforeHistoryChange', prefetchRoutes);
    };
  }, []);

  React.useEffect(() => {
    dispatch(getAmount());
  }, [cart]);

  return (
    <section id='cart-holder' role='list'>
      {cart && cart.map((i) => <CartItem key={i.id} item={i} />)}

      <footer>
        <Heading
          as='h3'
          id='total-summary'
          textAlign='right'
          fontSize='1.5rem'
          fontWeight='bold'
          color='purple.500'
          pt='10px'
          my='0'
          borderTop='1px'
          {...props.text}
        >
          TOTAL PRICE
        </Heading>

        <Heading
          as='strong'
          id='total-price'
          d='block'
          textAlign='right'
          aria-describedby='total-summary'
          my='0'
          {...props.amount}
        >
          {amount || '0.00'}&nbsp;$
        </Heading>
      </footer>
    </section>
  );
};

CartContent.defaultProps = {
  text: null,
  amount: null,
};

CartContent.propTypes = {
  /**
   * [Style Props](https://chakra-ui.com/style-props) for the total price text
   */
  text: PropTypes.object,

  /**
   * [Style Props](https://chakra-ui.com/style-props) for the amount text
   */
  amount: PropTypes.object,
};

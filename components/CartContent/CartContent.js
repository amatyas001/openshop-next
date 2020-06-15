import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { getAmount } from '../../redux/actions';
import { Heading } from '@chakra-ui/core';
import { CartItem } from '../index';

export async function getStaticProps() {
  return {
    props: { initialReduxState: { cart: [] } },
  };
}

// Displays all items which added to the cart
export const CartContent = () => {
  const { cart, amount } = useSelector((state) => state);
  const dispatch = useDispatch();

  // prefetching item info paths
  React.useEffect(() => {
    const prefetchRoutes = (url) => {
      url.match(/^\/item\/[\w]*$/gi) && Router.prefetch('/items/[id]', url);
    };
    Router.events.on('beforeHistoryChange', prefetchRoutes);
    return () => {
      Router.events.off('beforeHistoryChange', prefetchRoutes);
    };
  }, []);

  // update amount according to changes
  React.useEffect(() => {
    dispatch(getAmount());
  }, [cart]);

  return (
    <section id='cart-holder' role='list'>
      {/* items */}
      {cart.map((i) => (
        <CartItem key={i.id} item={i} />
      ))}

      <footer>
        {/* divider */}
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
        >
          TOTAL PRICE
        </Heading>

        {/* price */}
        <Heading
          as={'strong'}
          id='total-price'
          d='block'
          textAlign='right'
          aria-describedby='total-summary'
          my='0'
        >
          {amount}&nbsp;$
        </Heading>
      </footer>
    </section>
  );
};

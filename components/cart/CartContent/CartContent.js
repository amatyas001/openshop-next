import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Box } from '@chakra-ui/core';
import { CartItem } from '@app/components';

/**
 * Wrapper for listing products added to the cart
 *
 * @see https://amatyas001.github.io/openshop-next/#cartpanel
 */
export const CartContent = (props) => {
  const { icons, details } = props;
  const { cart } = useSelector((state) => state);
  return (
    <Box as='ul' role='list' width='90%' {...props}>
      {cart.map((item) => (
        <CartItem
          key={item.id}
          role='listitem'
          as='li'
          item={item}
          icons={icons}
          details={details}
        />
      ))}
    </Box>
  );
};

CartContent.defaultProps = {
  icons: false,
  details: false,
};

CartContent.propTypes = {
  /**
   * Show controls
   */
  icons: PropTypes.bool,

  /**
   * Show description
   */
  details: PropTypes.bool,
};

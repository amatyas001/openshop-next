import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa';
import { Text, PseudoBox, Flex, Image, Heading } from '@chakra-ui/core';
import { removeFromCart } from '@app/lib/redux/actions';
import { ButtonIcon } from '@app/components';
import * as COLORS from '@app/config';

/**
 * Renders a cart item with optional details and controls
 *
 * @see https://amatyas001.github.io/openshop-next/#cartpanel
 */
export const CartItem = (props) => {
  const dispatch = useDispatch();
  const { item, icons, details } = props;

  return (
    <PseudoBox
      alignItems='center'
      d='flex'
      fontSize='1.2rem'
      borderBottom='1px'
      borderColor={COLORS.SPACER.light}
      minHeight='100px'
      {...props}
    >
      <Image
        src={`/images/products/${item.img}`}
        width={{ sm: '15%', lg: '10%' }}
        objectFit='contain'
        alt={item.name}
      />
      <Flex flexDirection='column' p='10px'>
        <Heading as='strong' fontSize='1.6rem' color={COLORS.HEADING.dark}>
          {item.name}
        </Heading>
        <Heading as='em' fontSize='1.2rem' color={COLORS.HEADING.light}>
          {`${item.buy.color || item.color} in ${item.buy.size || 'One Size'} x${item.buy.amount}`}
        </Heading>
        {details && <Text data-testid='cart-item-description'>{item.description}</Text>}
      </Flex>
      <Heading as='strong' ml='auto' fontSize='1.8rem' color={COLORS.HEADING.dark}>
        {item.price.toFixed(2)}
        &nbsp;$
      </Heading>
      {icons && (
        <ButtonIcon
          data-testid='cart-item-button-delete'
          width='10%'
          mx='10px'
          fontSize='1.8rem'
          variant='danger'
          icon={FaTrashAlt}
          handler={() => dispatch(removeFromCart(item))}
        />
      )}
    </PseudoBox>
  );
};

CartItem.defaultProps = {
  icons: false,
  details: false,
};

CartItem.propTypes = {
  /**
   * Unique item in cart
   */
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    description: PropTypes.string,
    gender: PropTypes.string,
    img: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    review: PropTypes.string,
    sizes: PropTypes.arrayOf(PropTypes.string),
    starrating: PropTypes.number.isRequired,
    buy: PropTypes.shape({
      amount: PropTypes.number.isRequired,
      color: PropTypes.string,
      size: PropTypes.string,
    }),
  }).isRequired,

  /**
   * Show controls
   */
  icons: PropTypes.bool,

  /**
   * Show description
   */
  details: PropTypes.bool,
};

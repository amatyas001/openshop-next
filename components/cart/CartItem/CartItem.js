import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Text, Flex, Image, Heading } from '@chakra-ui/core';
import { removeFromCart } from '@app/redux/actions';
import { ButtonTrash } from '@app/components';

/**
 * Displays details of an individual item from the cart and trash button.

 * ***Wrapped Components***
 * - [ButtonTrash](#buttontrash)
 *
 * @example
 * ```jsx
 * <CartItem item={cartItem} icons={toggleIcons} />
 * ```
 */
export const CartItem = (props) => {
  const dispatch = useDispatch();
  const { item, icons } = props;

  return (
    <Flex alignItems='center' fontSize='1.2rem' {...props}>
      <Image
        src={`/images/products/${item.img}`}
        width='15%'
        objectFit='contain'
        alt={item.name}
      />
      <Flex
        flexDirection='column'
        width='20%'
        borderRight='1px'
        borderColor='gray.400'
        p='10px'
      >
        <Text as='strong'>{item.name}</Text>
        <Text as='em' fontSize='1rem'>
          {item.color}
        </Text>
      </Flex>
      <Text as='p' ml='15px' flexWrap='wrap' width='50%' fontSize='1rem'>
        {item.desc}
      </Text>
      <Heading as='strong' width='10%' ml='auto' mr='15px' fontSize='1.8rem'>
        {item.price.toFixed(2)}&nbsp;$
      </Heading>
      {icons && (
        <Flex width='5%' justifyContent='space-around' mb='-5px'>
          <ButtonTrash handler={() => dispatch(removeFromCart(item))} />
        </Flex>
      )}
    </Flex>
  );
};

CartItem.defaultProps = {
  icons: true,
};

CartItem.propTypes = {
  /**
   * Individual store item
   */
  item: PropTypes.object.isRequired,

  /**
   * Toggle display of item controls
   */
  icons: PropTypes.bool,
};

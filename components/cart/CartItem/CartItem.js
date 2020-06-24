import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { FaTrashAlt, FaInfo } from 'react-icons/fa';
import { Text, Flex, Image } from '@chakra-ui/core';
import { removeFromCart } from '@app/redux/actions';
import { Button } from '@app/components';

/**
 * Displays an individual item from the cart representing by
 * its image, name and price.
 *
 * Item has an *Info* and *Delete* control buttons attached to it.
 * *Info* button redirects the user to the item's details page while
 * *Delete* removes the selected item from the `cart` object.
 *
 * > ***State***
 * > - `cart`
 *
 * > ***Elements***
 * > - [Button](#button)
 *
 * @example
 * ```jsx
 * <CartItem item={individualItem} info={infoStyle} delete={deleteStyle} />
 * ```
 */
export const CartItem = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <Flex
      role='listitem'
      as={'article'}
      alignItems='center'
      fontSize='1.2rem'
      my='3%'
      {...props}
    >
      <Image
        src={`/images/products/${props.item.img}`}
        size='60px'
        objectFit='contain'
        alt={props.item.name}
      />
      <Text as='strong' ml='10px'>
        {props.item.name} - {props.item.color}
      </Text>
      <Text as='strong' ml='auto'>
        {props.item.price}&nbsp;$
      </Text>
      <Button
        as={FaInfo}
        role='button'
        aria-label='Item info'
        ml='20px'
        fontSize='0.6rem'
        color='blue.400'
        backgroundColor='transparent'
        border='0'
        onClick={() => router.replace(`/items/${props.item.id}`)}
        _hover={{ color: 'blue.600' }}
        {...props.info}
      />
      <Button
        as={FaTrashAlt}
        role='button'
        aria-label='Delete item'
        ml='0px'
        fontSize='1.5rem'
        width='20px'
        color='red.600'
        backgroundColor='transparent'
        border='0'
        onClick={() => dispatch(removeFromCart(props.item))}
        _hover={{ color: 'red.800' }}
        {...props.delete}
      />
    </Flex>
  );
};

CartItem.defaultProps = {
  info: null,
  delete: null,
};

CartItem.propTypes = {
  /**
   * Individual store item
   */
  item: PropTypes.object.isRequired,

  /**
   * [Style Props](https://chakra-ui.com/style-props) for info button
   */
  info: PropTypes.object,

  /**
   * [Style Props](https://chakra-ui.com/style-props) for delete button
   */
  delete: PropTypes.object,
};

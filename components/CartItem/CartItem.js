import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/actions';
import { Text, Flex, Image } from '@chakra-ui/core';
import { FaTrashAlt, FaInfo } from 'react-icons/fa';
import { Button } from '../index';

// Display a single item in the CartContent
// Hides info button while checkout in progress
export const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <Flex
      role='listitem'
      as={'article'}
      alignItems='center'
      fontSize='1.2rem'
      my='3%'
    >
      {/* image */}
      <Image
        src={`/images/products/${item.img}`}
        size='60px'
        objectFit='contain'
        alt={item.name}
      />

      {/* name */}
      <Text as='strong' ml='10px'>
        {item.name} - {item.color}
      </Text>

      {/* price */}
      <Text as='strong' ml='auto'>
        {item.price}&nbsp;$
      </Text>

      {/* info button */}
      {router.pathname !== 'checkout' && (
        <Button
          as={FaInfo}
          role='button'
          aria-label='Item info'
          ml='20px'
          fontSize='0.6rem'
          color='blue.400'
          backgroundColor='transparent'
          border='0'
          onClick={() => router.replace(`/items/${item.id}`)}
          _hover={{ color: 'blue.600' }}
        />
      )}

      {/* delete button */}
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
        onClick={() => dispatch(removeFromCart(item))}
        _hover={{ color: 'red.800' }}
      />
    </Flex>
  );
};

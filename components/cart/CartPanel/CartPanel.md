```jsx
import { useDispatch, useSelector } from 'react-redux';
import { Flex } from '@chakra-ui/core';
import { addToCart } from '@app/redux/actions';
import { Button } from '@app/components';

const dispatch = useDispatch();
const { cart } = useSelector((store) => store);

const items = [
  {
    id: 0,
    img: '1.jpg',
    name: 'My fancy item',
    desc: 'The best item in the world',
    color: 'Rainbow',
    price: 100,
  },
  {
    id: 1,
    img: '2.jpg',
    name: 'My cool item',
    desc: 'The best item in the world',
    color: 'Pink',
    price: 30,
  },
  {
    id: 2,
    img: '3.jpg',
    name: 'My awesome item',
    desc: 'The best item in the world',
    color: 'Brown',
    price: 150,
  },
];

const index = (cart && cart.length) || 0;

<Flex>
  <Button
    width='40%'
    onClick={() => {
      index !== items.length && dispatch(addToCart(items[index]));
    }}
  >
    Add item ({items.length - index} left)
  </Button>
  <CartPanel
    d='block'
    ml='auto'
    mr='-37px'
    panel={{ width: '93%', top: '100px' }}
  />
</Flex>;
```

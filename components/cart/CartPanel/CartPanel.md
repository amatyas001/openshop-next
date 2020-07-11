```jsx noeditor
import { useDispatch, useSelector } from 'react-redux';
import { Flex } from '@chakra-ui/core';
import { addToCart } from '@app/lib/redux/actions';
import { Button } from '@app/components';

const dispatch = useDispatch();
const { cart } = useSelector((store) => store);

const products = [
  {
    id: 'cartitemid',
    img: '1.jpg',
    name: 'My fancy item',
    description: 'The best item in the world',
    color: 'Rainbow',
    price: 100,
    starrating: 5,
    buy: {
      size: 'One Size',
      color: 'Rainbow',
      amount: 1,
    },
  },
  {
    id: 'cartitemid2',
    img: '2.jpg',
    name: 'My cool item',
    description: 'The best item in the world',
    color: 'Pink',
    price: 30,
    starrating: 3,
    buy: {
      amount: 1,
    },
  },
  {
    id: 'cartitemid3',
    img: '3.jpg',
    name: 'My awesome item',
    description: 'The best item in the world',
    color: 'Brown',
    price: 150,
    starrating: 4,
    buy: {
      amount: 1,
    },
  },
];

<>
  <Flex height='60px' pb='150px'>
    <Button
      width='100%'
      variant='secondary'
      onClick={() =>
        dispatch(
          addToCart(products[Math.floor(Math.random() * products.length)])
        )
      }
    >
      add random product to cart
    </Button>
    <CartPanel width='96%' />
  </Flex>
</>;
```

---

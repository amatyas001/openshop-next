import Head from 'next/head';
import {
  Heading,
  Button,
  Flex,
  Divider,
  Box,
  Input,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SimpleGrid,
  Select,
} from '@chakra-ui/core';
import { Card } from '../../components';
import { FaSearch, FaRev } from 'react-icons/fa';

export async function getStaticProps() {
  const items = await import('../../public/storedata.json');

  return {
    props: {
      items: items.items,
    },
  };
}

export default function ({ items }) {
  const [showItems, setShowItems] = React.useState([]);
  const [filters, setFilters] = React.useState(false);
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState(200);
  const [color, setColor] = React.useState('All');
  const [colorValues, setColorValues] = React.useState([]);

  React.useEffect(() => {
    {
      const colors = [];
      colors.push('All');
      items.forEach((item) => colors.push(item.color));
      setColorValues(
        [...new Set(colors)].map((c) => {
          return (
            <option key={c} value={c}>
              {c}
            </option>
          );
        })
      );
    }
  }, []);

  React.useEffect(() => {
    setShowItems(
      items.filter((item) => {
        const itemcolor = color !== 'All' ? item.color === color : true;
        return (
          itemcolor &&
          item.price <= price &&
          item.name.toLowerCase().includes(name)
        );
      })
    );
  }, [name, price, color]);

  return (
    <>
      <Head>
        <title>OpenShop - Browse</title>
        <meta name='description' content='OpenShop public items' />
      </Head>
      <Heading as='h1' size='2x1' d='none'>
        Browse
      </Heading>
      <Button
        name='togglefilters'
        onClick={() => setFilters(!filters)}
        mx='auto'
        fontSize='1.3rem'
        bg='white'
        border='0'
        _active={{
          border: 0,
        }}
        _focus={{
          border: 0,
        }}
        _hover={{
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
      >
        <Text as={FaSearch} mr='5px' fontSize='1rem'></Text>
        {filters ? 'hide filters' : 'show filters'}
      </Button>
      <SimpleGrid
        as='form'
        name='filters'
        columns='1'
        width={{ sm: '90%', lg: '70%', xl: '50%' }}
        mt='20px'
        mx='auto'
        px='5%'
        pt='20px'
        borderTop='1px'
        borderBottom='1px'
        d={filters ? 'block' : 'none'}
      >
        <Heading as='label' htmlFor='name' fontSize='1.3rem'>
          Name
        </Heading>
        <Input
          name='name'
          placeholder='Filter by name...'
          width='95%'
          size='md'
          mb='30px'
          value={name}
          onChange={(e) => setName(e.target.value.toLowerCase())}
        />
        <Flex flexDirection='column'>
          <Heading
            as={'label'}
            htmlFor='price'
            fontSize='1.3rem'
            mt='-10px'
            mb='-30px'
          >
            Price
          </Heading>
          <Slider
            name='price'
            ml='60px'
            width='91%'
            value={price}
            min={1}
            max={200}
            value={price}
            onChange={(value) => setPrice(value)}
          >
            <SliderTrack bg='gray.100' />
            <SliderFilledTrack bg='gray.800' />
            <SliderThumb bg='gray.800' />
            <Text fontSize='1.2rem' fontWeight='bold' ml='-60px'>
              {price} $
            </Text>
          </Slider>
          <Heading as='label' htmlFor='color' fontSize='1.3rem'>
            Color
          </Heading>
          <Select
            name='color'
            width='100%'
            size='sm'
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
            }}
          >
            {colorValues}
          </Select>
          <Button
            name='reset'
            onClick={() => {
              setName('');
              setPrice(200);
              setColor('All');
            }}
            mx='auto'
            fontSize='1.3rem'
            bg='white'
            border='0'
            _active={{
              border: 0,
            }}
            _focus={{
              border: 0,
            }}
            _hover={{
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            <Text as={FaRev} mr='5px' fontSize='1rem'></Text>
            reset
          </Button>
        </Flex>
      </SimpleGrid>
      <Flex
        width='100%'
        flexWrap='wrap'
        alignItems='center'
        justifyContent='space-around'
      >
        {showItems.length ? (
          showItems.map((item) => (
            <Box key={item.name}>
              <Divider orientation='vertical' />
              <Card item={item} />
              <Divider orientation='vertical' />
            </Box>
          ))
        ) : (
          <Heading mx='auto' my='3rem'>
            no results found
          </Heading>
        )}
      </Flex>
    </>
  );
}

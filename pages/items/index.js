import Head from 'next/head';
import {
  Box,
  Button,
  Collapse,
  Divider,
  Flex,
  Heading,
  Input,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
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
  const [showItems, setShowItems] = React.useState(items);
  const [showFilters, setShowFilters] = React.useState(false);
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState(200);
  const [color, setColor] = React.useState('All');
  const [colors, setColors] = React.useState([]);

  // get available colors
  React.useEffect(() => {
    {
      const colors = [];
      colors.push('All');
      items.forEach((item) => colors.push(item.color));
      setColors(
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

  // filter logic
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

      {/* filter button */}
      <Button
        onClick={() => setShowFilters(!showFilters)}
        name='togglefilters'
        width={{ sm: '100%', md: '80%', lg: '70%', xl: '60%' }}
        mx='auto'
        mt='25px'
        fontSize='1.3rem'
        bg='purple.800'
        color='gray.100'
        border='1px'
        borderColor='purple.400'
        borderRadius='0'
        _hover={{
          bg: 'purple.400',
          color: 'gray.100',
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
      >
        <Text as={FaSearch} mr='5px' fontSize='1rem'></Text>
        {showFilters ? 'hide filters' : 'show filters'}
      </Button>

      {/* filter box */}
      <Collapse isOpen={showFilters}>
        <Flex
          as='form'
          name='filters'
          flexDirection='column'
          width={{ sm: '90%', md: '70%', lg: '60%', xl: '50%' }}
          mx='auto'
          px='5%'
          py='15px'
          border='1px'
          borderColor='purple.400'
          bg='purple.100'
        >
          {/* name filter */}
          <Heading as='label' htmlFor='name' fontSize='1.3rem'>
            Name
          </Heading>
          <Input
            name='name'
            placeholder='Filter by name...'
            width='94%'
            size='md'
            mb='20px'
            px='3%'
            value={name}
            onChange={(e) => setName(e.target.value.toLowerCase())}
          />

          {/* price filter */}
          <Heading as='label' htmlFor='price' fontSize='1.3rem'>
            Price
          </Heading>
          <Slider
            name='price'
            d='inline-block'
            ml='11%'
            mt='-30px'
            width='89%'
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

          {/* color filter */}
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
            {colors}
          </Select>

          {/* reset button */}
          <Button
            name='reset'
            onClick={() => {
              setName('');
              setPrice(200);
              setColor('All');
            }}
            width='100%'
            mt='10px'
            mx='auto'
            fontSize='1.3rem'
            bg='purple.800'
            color='gray.100'
            border='1px'
            borderColor='purple.400'
            borderRadius='0'
            _hover={{
              bg: 'purple.400',
              color: 'gray.100',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            <Text as={FaRev} mr='5px' fontSize='1rem'></Text>
            reset
          </Button>
        </Flex>
      </Collapse>

      {/* items grid */}
      <Flex
        width='94%'
        px='3%'
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

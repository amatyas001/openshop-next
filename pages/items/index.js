import Head from 'next/head';
import { useSelector } from 'react-redux';
import { Box, Divider, Flex, Heading } from '@chakra-ui/core';
import { Card, FilterPanel, Spinner } from '@app/components';

/** @ignore */
export async function getStaticProps() {
  const items = await import('../../public/storedata.json');

  return {
    props: {
      items: items.items,
    },
  };
}

/** @component */
const Items = ({ items }) => {
  const { filters = { color: 'All', name: '', price: 200 } } = useSelector(
    (store) => store
  );

  const [tick, setTick] = React.useState(false);
  const [content, setContent] = React.useState(false);

  // debouncing filters
  React.useEffect(() => {
    const filter = async () => {
      const filtered = items.filter((item) => {
        return (
          (filters.color === 'All' ? true : item.color === filters.color) &&
          item.price <= filters.price &&
          item.name.toLowerCase().includes(filters.name)
        );
      });

      setContent(
        filtered.length ? (
          filtered.map((item) => (
            <Box key={item.name}>
              <Divider orientation='vertical' />
              <Card item={item} />
              <Divider orientation='vertical' />
            </Box>
          ))
        ) : (
          <Heading as='h3' mx='auto' my='3rem'>
            no results found
          </Heading>
        )
      );
      setTick(true);
    };

    if (!tick) {
      filter();
    }

    setTimeout(() => {
      setTick(false);
    }, 300);
  }, [filters]);

  return (
    <>
      <Head>
        <title>OpenShop - Browse</title>
        <meta name='description' content='OpenShop public items' />
      </Head>

      {content && <FilterPanel items={items} />}

      <Flex
        width='94%'
        px='3%'
        flexWrap='wrap'
        alignItems='center'
        justifyContent='space-around'
      >
        {content || <Spinner text='Please wait while we loading beauties...' />}
      </Flex>
    </>
  );
};

export default Items;

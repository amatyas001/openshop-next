import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { SimpleGrid, Heading, Divider } from '@chakra-ui/core';
import { filterReset } from '@app/lib/redux/actions';
import { ProductCard, ProductsTopBar, Spinner } from '@app/components';

export async function getStaticProps() {
  const products = await import('../public/storedata.json').then(
    (mod) => mod.default.items
  );

  return {
    props: {
      products,
      limit: 10,
    },
  };
}

const Products = (props) => {
  const { products, limit } = props;
  const { filters, panel } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(true);
  const [content, setContent] = React.useState([]);
  const [index, setIndex] = React.useState(0);
  const [page, setPage] = React.useState(1);

  const navigation = React.useMemo(
    () => (
      <ProductsTopBar
        products={products}
        page={page}
        max={Math.ceil(content.length / limit)}
        index={index}
        setIndex={setIndex}
      />
    ),
    [content, index, page]
  );

  const grid = React.useMemo(
    () => (
      <SimpleGrid width='90%' columns='1' mx='5%' zIndex='4' id='products-grid'>
        {content.length ? (
          content
            .slice(index, index + limit)
            .map((item) => <ProductCard key={item.id} product={item} />)
        ) : (
          <Heading as='h3' mx='auto' my='3rem'>
            no results found
          </Heading>
        )}
      </SimpleGrid>
    ),
    [content, index]
  );

  React.useEffect(() => {
    dispatch(filterReset());
  }, []);

  React.useEffect(() => {
    setPage(Math.trunc(Number(index + limit) / limit));
  }, [index]);

  React.useEffect(() => {
    setLoading(true);
    setIndex(0);
    const filtered = async () =>
      setContent(
        await products.filter((item) => {
          return (
            (filters.color === 'All'
              ? true
              : Array.isArray(item.color)
              ? item.color.includes(filters.color)
              : item.color === filters.color) &&
            item.price <= filters.price &&
            item.name.toLowerCase().includes(filters.name)
          );
        })
      );
    filtered();
    window.scrollTo({
      top: 0,
    });
    setLoading(false);
  }, [filters]);

  return (
    <>
      <Head>
        <title>OpenShop - Browse Items | Page {page}</title>
        <meta
          name='description'
          content={`Openshop browse products page ${page}`}
        />
      </Head>
      {!loading && navigation}
      <Divider
        mt={
          !panel.filters
            ? { sm: '30px', lg: '10px' }
            : { sm: '430px', lg: '140px' }
        }
      />
      {loading ? <Spinner text='Loading products...' /> : grid}
    </>
  );
};

export default Products;

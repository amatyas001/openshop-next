import PropTypes from 'prop-types';
import { SimpleGrid } from '@chakra-ui/core';
import { FilterPanel, Button } from '@app/components';

/**
 * Renders a navigation bar with pagination buttons and filter panel
 *
 * @see https://amatyas001.github.io/openshop-next/#section-configuration
 * @see https://amatyas001.github.io/openshop-next/#filterpanel
 */
export const ProductsTopBar = (props) => {
  const { page, max, products, index, setIndex } = props;
  return (
    <SimpleGrid
      columns='3'
      position='fixed'
      right={{ sm: 0, lg: '10%' }}
      left={{ sm: 0, lg: '10%' }}
      zIndex='5'
      {...props}
    >
      <Button
        data-testid='products-top-previous'
        disabled={page === 1}
        onClick={() => {
          setIndex(/* istanbul ignore next */ Number(index) - 10 < 0 ? 0 : Number(index) - 10);
          window.scrollTo({
            top: 0,
          });
        }}
      >
        Previous Page
      </Button>
      <FilterPanel products={products} width='100%' />
      <Button
        data-testid='products-top-next'
        disabled={page >= max}
        onClick={() => {
          setIndex(Number(index) + 10);
          window.scrollTo({
            top: 0,
          });
        }}
      >
        {`Next Page ${page} of ${max}`}
      </Button>
    </SimpleGrid>
  );
};

ProductsTopBar.propTypes = {
  /**
   * Current page of the products list
   */
  page: PropTypes.number.isRequired,

  /**
   * Maximum number of pages in the pagination
   */
  max: PropTypes.number.isRequired,

  /**
   * Starting index of currently displayed products
   */
  index: PropTypes.number.isRequired,

  /**
   * Handler function of setting starting index of displayed products
   */
  setIndex: PropTypes.func.isRequired,

  /**
   * Product list
   */
  products: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
};

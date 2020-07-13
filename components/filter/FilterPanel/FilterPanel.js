import PropTypes from 'prop-types';
import { Box, Flex, SimpleGrid } from '@chakra-ui/core';
import {
  FilterButton,
  FilterName,
  FilterPrice,
  FilterColor,
  FilterReset,
  Panel,
} from '@app/components';
import * as COLORS from '@app/config/colors';
import { useSelector } from 'react-redux';

/**
 * Renders a [Panel](#panel) wrapping product filter components. Read the
 * [State Management](#section-state-management) section for more details
 * on filter actions which are dispatched by the filter components. List
 * of products is passed as a required prop.
 *
 * @visibleName Product Filters
 * @example
 * ```jsx
 * <FilterPanel products={productList}/>
 * ```
 */
export const FilterPanel = (props) => {
  const { products } = props;
  const { filters } = useSelector((state) => state.panel);
  return (
    <Box width={{ sm: '100%', md: '80%', lg: '70%', xl: '60%' }} {...props}>
      <FilterButton />
      <Panel
        toggle={filters}
        py='1.5%'
        position='absolute'
        right='0'
        left='0'
        bg={COLORS.BG.light}
        border='0'
        borderTop='1px'
        borderTopColor={COLORS.SPACER.light}
        borderBottom='2px'
        borderBottomColor={COLORS.SPACER.light}
      >
        <Flex as='form' name='filters' flexDirection='column' width='100%' mx='auto'>
          <SimpleGrid columns={{ sm: 1, lg: 4 }} spacing='30px'>
            <FilterName />
            <FilterColor products={products} />
            <FilterPrice products={products} />
            <FilterReset />
          </SimpleGrid>
        </Flex>
      </Panel>
    </Box>
  );
};

FilterPanel.propTypes = {
  /**
   * Product list to be filtered
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

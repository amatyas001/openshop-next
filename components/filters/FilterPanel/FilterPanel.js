import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Box, Button, Collapse, Flex } from '@chakra-ui/core';
import {
  FilterName,
  FilterPrice,
  FilterColor,
  FilterReset,
} from '@app/components';

/**
 * Wrapper component which can be imported to a page representing items.
 * Displays toggle button and a collapsable container of item filters.
 * The panel is **closed by default**. It manages its own state to
 * control the visibility of nested components.
 *
 * For more information: [Chakra/Collapse](https://chakra-ui.com/collapse)
 *
 * *Note:* `items` prop is passed down to [FilterColor](#filtercolor) component
 *
 * @example
 * ```jsx
 * <FilterPanel items={items} />
 * ```
 */
export const FilterPanel = ({ items }) => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <Button
        onClick={() => setShow(!show)}
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
        <Box as={FaSearch} mr='5px' fontSize='1rem' />
        {show ? 'hide filters' : 'show filters'}
      </Button>
      <Collapse isOpen={show}>
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
          <FilterName />
          <FilterPrice />
          <FilterColor items={items} />
          <FilterReset />
        </Flex>
      </Collapse>
    </>
  );
};

FilterPanel.propTypes = {
  /**
   * Array of available items
   *
   */
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

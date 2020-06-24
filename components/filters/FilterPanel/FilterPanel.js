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
 * Wrapper component displaying toggler button and collapsable container
 * of nested filters.
 * 
 * > ***Elements***
 * > - [Collapse](https://chakra-ui.com/collapse)
 * > - [Button](#button)
 * > - Any [Filter](#section-filters) element

 * @example
 * ```jsx
 * <FilterPanel items={itemsArray} button={buttonStyles} panel={panelStyles} />
 * ```
 */
export const FilterPanel = (props) => {
  const [show, setShow] = React.useState(false);

  return (
    <Box width={{ sm: '100%', md: '80%', lg: '70%', xl: '60%' }} {...props}>
      <Button
        onClick={() => setShow(!show)}
        name='togglefilters'
        width='100%'
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
        {...props.button}
      >
        <Box as={FaSearch} mr='5px' fontSize='1rem' />
        {show ? 'hide filters' : 'show filters'}
      </Button>
      <Collapse isOpen={show}>
        <Flex
          as='form'
          name='filters'
          flexDirection='column'
          width='90%'
          mx='auto'
          px='5%'
          py='15px'
          border='1px'
          borderColor='purple.400'
          bg='purple.100'
          {...props.panel}
        >
          <FilterName />
          <FilterPrice items={props.items} />
          <FilterColor items={props.items} />
          <FilterReset />
        </Flex>
      </Collapse>
    </Box>
  );
};

FilterPanel.defaultProps = {
  button: null,
  panel: null,
};

FilterPanel.propTypes = {
  /**
   * Array of available items passed to filter elements where needed
   */
  items: PropTypes.arrayOf(PropTypes.object).isRequired,

  /**
   * [Style Props Object](https://chakra-ui.com/style-props) for button element
   */
  button: PropTypes.object,

  /**
   * [Style Props Object](https://chakra-ui.com/style-props) for collapse panel
   */
  panel: PropTypes.object,
};

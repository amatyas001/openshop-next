import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FaRev } from 'react-icons/fa';
import { Box, Button } from '@chakra-ui/core';
import { filterReset } from '@app/redux/actions';

/**
 * Renders a button which resets all filters to the default values.
 *
 * > ***State***
 * > - All [Filter](#section-filters) states
 *
 * > ***Elements***
 * > - [Button](#button)
 *
 * @example
 * ```jsx
 * <FilterReset icon={<CustomIcon />} text="Custom Text" />
 * ```
 */
export const FilterReset = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      {' '}
      <Button
        name='reset'
        onClick={() => {
          dispatch(filterReset(''));
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
        {...props}
      >
        {props.icon || <Box as={FaRev} mr='5px' fontSize='1rem' />}
        {props.text || 'reset'}
      </Button>
    </>
  );
};

FilterReset.defaultProps = {
  icon: null,
  text: null,
};

FilterReset.propTypes = {
  /**
   * Custom element for button icon
   */
  icon: PropTypes.element,

  /**
   * Custom text for button
   */
  text: PropTypes.string,
};

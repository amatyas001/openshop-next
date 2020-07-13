import { useDispatch } from 'react-redux';
import { Box, Heading, Input } from '@chakra-ui/core';
import { filterName } from '@app/lib/redux/actions';
import { Debounce } from '@app/lib/utils';
import * as COLORS from '@app/config/colors';

/**
 * Renders a text input to filter products by a given phrase
 *
 * @see https://amatyas001.github.io/openshop-next/#filterpanel
 */
export const FilterName = (props) => {
  const dispatch = useDispatch();
  const handler = Debounce((value) => {
    dispatch(filterName(value.toLowerCase()));
  }, 300);

  return (
    <Box>
      <Heading as='label' htmlFor='name' fontSize='1.3rem' color={COLORS.HEADING.dark}>
        Name
      </Heading>
      <Input
        bg={COLORS.BUTTON.transparent.base}
        border='0'
        borderBottom='1px'
        borderRadius='0'
        color={COLORS.BUTTON.primary.base}
        fontFamily='Khand'
        fontSize='1.4rem'
        fontWeight='bold'
        mb={{ sm: 0, lg: '20px' }}
        name='name'
        placeholder='Filter by name...'
        px='3%'
        size='md'
        width='94%'
        _placeholder={{ color: COLORS.BUTTON.primary.base }}
        _hover={{
          ...COLORS.BUTTON.transparent.hover,
          color: COLORS.BUTTON.primary.hover.bg,
          textDecoration: 'none',
        }}
        _focus={{
          ...COLORS.BUTTON.transparent.hover,
          color: COLORS.BUTTON.primary.hover.bg,
          textDecoration: 'none',
        }}
        _select={{
          ...COLORS.BUTTON.transparent.hover,
          color: COLORS.BUTTON.primary.hover.bg,
          textDecoration: 'none',
        }}
        _active={{
          ...COLORS.BUTTON.transparent.hover,
          color: COLORS.BUTTON.primary.hover.bg,
          textDecoration: 'none',
        }}
        onChange={(e) => handler(e.target.value)}
        {...props}
      />
    </Box>
  );
};

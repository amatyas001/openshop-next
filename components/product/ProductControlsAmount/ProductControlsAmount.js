import PropTypes from 'prop-types';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
} from '@chakra-ui/core';
import * as COLORS from '@app/config/colors';
import { Button } from '@app/components';
import { FaMinusSquare, FaPlusSquare } from 'react-icons/fa';
import { ProductShape } from '@app/lib/types';

/**
 * Renders an input field to select the amount of a specific product.
 *
 * @see https://amatyas001.github.io/openshop-next/#productcard
 */
export const ProductControlsAmount = React.memo(
  (props) => {
    const { setDetails, details, product } = props;

    return (
      <NumberInput
        data-testid='product-amount-wrapper'
        defaultValue={0}
        focusInputOnChange={false}
        max={product.amount}
        min={0}
        onChange={(e) => setDetails(e)}
        value={details.buy.amount}
      >
        <Flex width='100%'>
          <NumberInputStepper
            borderColor='transparent'
            color={COLORS.HEADING.light}
            flexDirection='row'
            alignItems='center'
            width='100%'
          >
            <NumberIncrementStepper
              as={Button}
              children={<FaPlusSquare />}
              data-testid='product-amount-increment'
              fontSize='2.5rem'
              height='50px'
              borderTopRightRadius='0px !important'
              borderRight='0'
              bg={COLORS.BUTTON.transparent.base}
              _hover={{
                bg: 'transparent',
                color: COLORS.BUTTON.primary.hover.bg,
              }}
              _focus={{
                bg: 'transparent',
                color: COLORS.BUTTON.primary.hover.bg,
              }}
              _selected={{
                bg: 'transparent',
                color: COLORS.BUTTON.primary.hover.bg,
              }}
              _active={{
                bg: 'transparent',
                color: COLORS.BUTTON.primary.hover.bg,
              }}
              color={COLORS.BUTTON.primary.base}
            />
            <NumberDecrementStepper
              as={Button}
              children={<FaMinusSquare />}
              data-testid='product-amount-decrement'
              fontSize='2.5rem'
              height='50px'
              mt='0px !important'
              bg={COLORS.BUTTON.transparent.base}
              color={COLORS.BUTTON.primary.base}
              _hover={{
                bg: 'transparent',
                color: COLORS.BUTTON.primary.hover.bg,
              }}
              _focus={{
                bg: 'transparent',
                color: COLORS.BUTTON.primary.hover.bg,
              }}
              _selected={{
                bg: 'transparent',
                color: COLORS.BUTTON.primary.hover.bg,
              }}
              _active={{
                bg: 'transparent',
                color: COLORS.BUTTON.primary.hover.bg,
              }}
              borderRadius='0'
              borderLeft='0'
            />
          </NumberInputStepper>
          <NumberInputField
            backgroundColor={COLORS.BG.dark}
            border='0'
            color={COLORS.HEADING.light}
            data-testid='product-amount-input'
            fontFamily='Khand'
            fontSize='1.8rem'
            fontWeight='bold'
            isReadOnly={true}
            mb='-4px'
            textAlign='center'
            width='100%'
            _hover={{}}
            _focus={{}}
            _active={{}}
            _selected={{}}
          />
        </Flex>
      </NumberInput>
    );
  },
  /* istanbul ignore next */
  (prev, next) => prev.details.buy.amount === next.details.buy.amount
);

ProductControlsAmount.propTypes = {
  /**
   * Unique product object
   */
  product: PropTypes.shape({ ...ProductShape }).isRequired,

  /**
   * Unique product object with buying details
   */
  details: PropTypes.shape({
    ...ProductShape,
    buy: PropTypes.shape({
      amount: PropTypes.number.isRequired,
      size: PropTypes.string,
      color: PropTypes.string,
    }),
  }).isRequired,

  /**
   * Set buying details
   */
  setDetails: PropTypes.func.isRequired,
};

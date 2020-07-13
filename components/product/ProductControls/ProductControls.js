import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';
import { Heading, Text, Flex, Box, SimpleGrid } from '@chakra-ui/core';
import * as COLORS from '@app/config/colors';
import {
  ProductControlsAmount,
  ProductControlsButton,
  ProductControlsColor,
  ProductControlsSize,
} from '@app/components';

/**
 * Wrapper for input elements of a specific product buying details.
 *
 * @see https://amatyas001.github.io/openshop-next/#productcard
 */
export const ProductControls = (props) => {
  const { product } = props;
  const [details, setDetails] = React.useState({
    ...product,
    buy: { amount: 0 },
  });

  return (
    <SimpleGrid
      alignItems='center'
      columns='2'
      width={{ sm: '100%', xl: '30%' }}
      minWidth={{ xl: '400px' }}
    >
      <span />
      <Heading
        alignSelf='center'
        fontSize='2rem'
        m='0'
        ml='auto'
        textAlign='center'
        color={COLORS.HEADING.dark}
      >
        {`${product.price}&nbsp;$`}
      </Heading>
      <ProductControlsColor
        product={product}
        details={details}
        setDetails={
          /* istanbul ignore next */
          (e) =>
            setDetails((prev) => ({ ...prev, buy: { ...prev.buy, color: e } }))
        }
      />
      <Flex fontSize='1.4rem' ml='auto' mb='2px' {...props}>
        {[...Array(Math.floor(product.starrating))].map((e, i) => (
          /* eslint react/no-array-index-key: "off" */
          <Box key={i} as={FaStar} color={COLORS.HEADING.light} />
        ))}
      </Flex>
      <ProductControlsSize
        product={product}
        details={details}
        setDetails={
          /* istanbul ignore next */
          (e) =>
            setDetails((prev) => ({ ...prev, buy: { ...prev.buy, size: e } }))
        }
      />
      <Text
        color={COLORS.BUTTON.primary.base}
        fontFamily='Khand'
        fontSize='1.4rem'
        fontWeight='bold'
        ml='auto'
        textTransform='uppercase'
      >
        {`${product.amount} in stock`}
      </Text>
      <ProductControlsAmount
        product={product}
        details={details}
        setDetails={
          /* istanbul ignore next */
          (e) =>
            setDetails((prev) => ({ ...prev, buy: { ...prev.buy, amount: e } }))
        }
      />
      <ProductControlsButton product={details} setDetails={setDetails} />
    </SimpleGrid>
  );
};

ProductControls.propTypes = {
  /**
   * Unique product which controls are rendered
   */
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    color: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    description: PropTypes.string,
    gender: PropTypes.string,
    img: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    review: PropTypes.string,
    sizes: PropTypes.arrayOf(PropTypes.string),
    starrating: PropTypes.number.isRequired,
  }).isRequired,
};

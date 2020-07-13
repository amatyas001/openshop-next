import PropTypes from 'prop-types';
import { Heading, Text, Flex } from '@chakra-ui/core';
import * as COLORS from '@app/config/colors';
import { Image, ProductControls } from '@app/components';

/**
 * Takes a product as prop and renders its details and shopping control
 * inputs which handles the addition of the related product to the cart.
 *
 * Buy [Button](https://amatyas001.github.io/openshop-next/#button) is disabled if
 *  - positive number of amount not selected
 *  - color or size not choosen from list
 *
 * Appropriate select fields are rendered only when product has multiple choices of color or size.

 * Amount is zero by default and maximum value is depending on the related product stock value.
 *
 * After submitting the product to the cart, shopping details are reset to the defaults.
 *
 * @visibleName Product Card
 * @example
 * ```jsx
 * <ProductCard product={product} />
 * ```
 */
export const ProductCard = (props) => {
  const { product } = props;
  const image = React.useMemo(
    () => <Image src={`/images/products/${product.img}`} />,
    [product.img]
  );
  return (
    <Flex
      borderTop='1px'
      borderTopColor={COLORS.SPACER.light}
      flexDirection='column'
      height='100%'
      id={product.id}
      my='15px'
      py='3%'
      {...props}
    >
      <Heading
        color={COLORS.HEADING.dark}
        fontSize='1.7rem'
        fontWeight='bold'
        mx='auto'
        textAlign='center'
        textTransform='uppercase'
      >
        {product.name}
      </Heading>
      <Flex
        alignItems='center'
        flexDirection={{ sm: 'column', xl: 'row' }}
        minHeight='400px'
        width='100%'
      >
        {image}
        <Text
          px='3%'
          py='1.5%'
          width={{ sm: '100%', lg: '50%' }}
          color={COLORS.HEADING.dark}
          fontFamily='Khand'
          fontSize='1.2rem'
          fontWeight='bold'
        >
          {product.description}
        </Text>
        <ProductControls product={product} />
      </Flex>
    </Flex>
  );
};

ProductCard.propTypes = {
  /**
   * A single product object which details and controls are rendered in the component
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

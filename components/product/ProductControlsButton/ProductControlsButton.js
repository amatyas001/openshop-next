import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import * as COLORS from '@app/config/colors';
import { addToCart } from '@app/lib/redux/actions';
import { Button } from '@app/components';
import { ProductShape } from '@app/lib/types';

// Helper function to check the validity of given shopping details
const valid = (state) =>
  (!Array.isArray(state.product.color)
    ? state.product.color
    : state.product.buy.color) &&
  (state.product.sizes ? state.product.buy.size : 'onesize') &&
  state.product.buy.amount > 0;

/**
 * Renders a button to add a specific product to the cart.
 *
 * @see https://amatyas001.github.io/openshop-next/#productcard
 */
export const ProductControlsButton = React.memo(
  (props) => {
    const { product, setDetails } = props;
    const dispatch = useDispatch();

    return (
      <Button
        onClick={() => {
          dispatch(addToCart(product));
          setDetails({ ...product, buy: { amount: 0 } });
        }}
        height='50px'
        disabled={!valid(props)}
        data-testid='product-buy-button'
        _disabled={{
          ...COLORS.BUTTON.secondary.hover,
        }}
        {...props}
      >
        buy
      </Button>
    );
  },
  /* istanbul ignore next */
  (prev, next) => valid(prev) === valid(next)
);

ProductControlsButton.defaultProps = {
  product: {
    buy: {
      amount: 0,
    },
  },
};

ProductControlsButton.propTypes = {
  /**
   * Unique item object with buying details
   */
  product: PropTypes.shape({
    ...ProductShape,
    buy: PropTypes.shape({
      amount: PropTypes.number.isRequired,
      color: PropTypes.string,
      size: PropTypes.string,
    }),
  }).isRequired,
};

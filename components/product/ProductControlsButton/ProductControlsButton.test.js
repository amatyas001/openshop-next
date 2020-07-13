import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mockProductWithBuyAmount } from '@app/mocks';
import { INITIAL_STATE } from '@app/config';
import { addToCart } from '@app/lib/redux/actions';
import { ProductControlsButton } from '@app/components';

let tree;
let store;
const mockStore = configureStore([]);
const details = mockProductWithBuyAmount(1, 0)[0];
const handler = jest.fn();
const tests = [
  {
    name: 'when color and size is static',
    details: {
      ...details,
      buy: {
        amount: 1,
      },
    },
  },
  {
    name: 'when color is array',
    details: {
      ...details,
      color: ['mock_color_0', 'mock_color_1'],
      buy: {
        amount: 1,
        color: 'mock_color_0',
      },
    },
  },
  {
    name: 'when size is array',
    details: {
      ...details,
      sizes: ['mock_size_0', 'mock_size_1'],
      buy: {
        amount: 1,
        size: 'mock_size_0',
      },
    },
  },
  {
    name: 'when color and size are arrays',
    details: {
      ...details,
      color: ['mock_color_0', 'mock_color_1'],
      sizes: ['mock_size_0', 'mock_size_1'],
      buy: {
        amount: 1,
        size: 'mock_size',
        color: 'mock_color',
      },
    },
  },
];

describe('<ProductControlsButton />', () => {
  beforeAll(() => {
    act(() => {
      tree = create(
        <Provider store={mockStore(INITIAL_STATE)}>
          <ProductControlsButton product={details} setDetails={handler} />
        </Provider>
      );
    });
  });

  it('should render with required props', () => {
    expect.assertions(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should be disabled if details are invalid', () => {
    expect.assertions(1);
    expect(
      tree.root.findByProps({
        'data-testid': 'product-buy-button',
      }).props.disabled
    ).toBeTruthy();
  });

  tests.forEach((test) => {
    describe(test.name, () => {
      let button;

      beforeAll(() => {
        store = mockStore(INITIAL_STATE);
        act(() => {
          tree = create(
            <Provider store={store}>
              <ProductControlsButton
                product={{ ...test.details }}
                setDetails={handler}
              />
            </Provider>
          );
        });
        button = tree.root.findByProps({
          'data-testid': 'product-buy-button',
        });
      });

      afterAll(() => {
        handler.mockClear();
      });

      it('should be enabled', () => {
        expect.assertions(1);
        expect(button.props.disabled).toBeFalsy();
      });

      it('should dispatch cart action', async () => {
        expect.assertions(1);
        await act(async () => {
          button.props.onClick();
        });
        expect(store.getActions()).toEqual([addToCart(test.details)]);
      });

      it(`should reset details ${test.name}`, () => {
        expect.assertions(2);
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith({
          ...test.details,
          buy: {
            amount: 0,
          },
        });
      });
    });
  });
});

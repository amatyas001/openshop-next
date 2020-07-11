import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { ProductControlsButton } from './ProductControlsButton';
import { addToCart } from '@app/lib/redux/actions';

const mockStore = configureStore([]);

const mock_handler = jest.fn();

describe('<ProductControlsButton />', () => {
  let tree, store, details;

  beforeAll(() => {
    details = {
      id: 'mock_id',
      name: 'mock_name',
      price: 10,
      amount: 10,
      color: 'mock_color',
      starrating: 3,
      buy: {
        amount: 0,
      },
    };

    act(() => {
      tree = create(
        <Provider store={mockStore({})}>
          <ProductControlsButton product={details} setDetails={mock_handler} />
        </Provider>
      );
    });
  });

  it('should render with required props', () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should be disabled if details are invalid', () => {
    expect(
      tree.root.findByProps({
        'data-testid': 'product-buy-button',
      }).props.disabled
    ).toBeTruthy();
  });

  let button,
    config = [
      {
        name: 'when color and size is static',
        details: {
          id: 'mock_id',
          name: 'mock_name',
          price: 10,
          color: 'mock_color',
          amount: 10,
          starrating: 3,
          buy: {
            amount: 1,
          },
        },
      },
      {
        name: 'when color is array',
        details: {
          id: 'mock_id',
          name: 'mock_name',
          price: 10,
          color: ['mock_color'],
          size: 'mock_size',
          amount: 10,
          starrating: 3,
          buy: {
            color: 'mock_color',
            amount: 1,
          },
        },
      },
      {
        name: 'when size is array',
        details: {
          id: 'mock_id',
          name: 'mock_name',
          price: 10,
          color: 'mock_color',
          size: ['mock_size'],
          amount: 10,
          starrating: 3,
          buy: {
            amount: 1,
            size: 'mock_size',
          },
        },
      },
      {
        name: 'when color and size are arrays',
        details: {
          id: 'mock_id',
          name: 'mock_name',
          price: 10,
          color: ['mock_color'],
          size: ['mock_size'],
          amount: 10,
          starrating: 3,
          buy: {
            amount: 1,
            size: 'mock_size',
            color: 'mock_color',
          },
        },
      },
    ];

  config.forEach((item) => {
    describe('with valid details', () => {
      beforeAll(() => {
        store = mockStore({});

        act(() => {
          tree = create(
            <Provider store={store}>
              <ProductControlsButton
                product={item.details}
                setDetails={mock_handler}
              />
            </Provider>
          );
        });

        button = tree.root.findByProps({
          'data-testid': 'product-buy-button',
        });
      });

      afterAll(() => {
        mock_handler.mockClear();
      });

      it(`should be enabled ${item.name}`, () => {
        expect(button.props.disabled).toBeFalsy();
      });

      it(`should dispatch addToCart action ${item.name}`, () => {
        act(() => {
          button.props.onClick();
        });

        expect(store.getActions()).toEqual([addToCart(item.details)]);
      });

      it(`should reset details ${item.name}`, () => {
        expect(mock_handler).toHaveBeenCalledTimes(1);
        expect(mock_handler).toHaveBeenCalledWith({
          ...item.details,
          buy: {
            amount: 0,
          },
        });
      });
    });
  });
});

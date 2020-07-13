import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mockProduct } from '@app/mocks';
import { INITIAL_STATE } from '@app/config';
import { ProductControls } from '@app/components';

let tree;
const product = mockProduct(1)[0];
const mockStore = configureStore([]);

describe('<ProductControls />', () => {
  beforeAll(() => {
    act(() => {
      tree = create(
        <Provider store={mockStore(INITIAL_STATE)}>
          <ProductControls product={product} />
        </Provider>
      );
    });
  });

  it('should render with required props', () => {
    expect.assertions(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

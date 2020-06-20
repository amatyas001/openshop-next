import { create } from 'react-test-renderer';
import { PaymentSuccess } from './PaymentSuccess';

describe('<PaymentSuccess />', () => {
  let tree,
    intent = {
      id: 'mock_id',
    };

  it('should render without props', () => {
    tree = create(<PaymentSuccess />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render intent details', () => {
    tree = create(<PaymentSuccess intent={intent} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

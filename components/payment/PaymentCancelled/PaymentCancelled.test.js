import { create } from 'react-test-renderer';
import { PaymentCancelled } from '@app/components';

describe('<PaymentCancelled />', () => {
  it('should render without props', () => {
    const tree = create(<PaymentCancelled />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render intent details', () => {
    const intent = { id: 'mock_id' };
    const tree = create(<PaymentCancelled intent={intent} />);
    expect(
      tree.root.findByProps({ 'data-testid': 'cancelled-details' }).props
        .children
    ).toContain(intent.id);
  });
});

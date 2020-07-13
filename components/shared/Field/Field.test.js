import { create, act } from 'react-test-renderer';
import { Field } from '@app/components';

let tree;
const handler = jest.fn();
const types = ['text', 'email', 'password'];
const props = {
  id: 'mock_id',
  label: 'mock_label',
  onChange: handler,
  placeholder: 'mock_placeholder',
  type: 'text',
};

describe('<Field />', () => {
  beforeAll(() => {
    tree = create(<Field {...props} />);
  });

  it('should render with required props', () => {
    expect.assertions(1);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should call handler', async () => {
    expect.assertions(1);
    await act(async () => {
      tree.root.findByType('input').props.onChange('');
    });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should render proper label', () => {
    expect.assertions(3);
    expect(tree.root.findByType('label').props.htmlFor).toEqual(props.id);
    expect(tree.root.findByType('input').props.id).toEqual(props.id);
    expect(tree.root.findByType('label').children).toContain(props.label);
  });

  types.forEach((type) => {
    it(`should render ${type} input`, () => {
      expect.assertions(1);
      tree = create(<Field {...props} type={type} />);
      expect(tree.root.findByType('input').props.type).toEqual(type);
    });
  });
});

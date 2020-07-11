import { create } from 'react-test-renderer';
import { Field } from '@app/components';

describe('<Field />', () => {
  it('should render without props', () => {
    const tree = create(<Field />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render fieldset element', () => {
    const tree = create(<Field />);
    expect(tree.toJSON().type).toBe('fieldset');
  });

  it('should render with props', () => {
    const handler = jest.fn();
    const props = {
      label: 'somefancyLabel',
      id: 'someFancyId',
      type: 'text',
      placeholder: 'someFancyPlaceholder',
      required: false,
      autoComplete: false,
      value: null,
      onChange: handler,
    };
    const tree = create(<Field {...props} />);
    for (let key in props) {
      expect(tree.root.props[key]).toBe(props[key]);
    }
  });

  it('should render proper input', () => {
    const types = ['text', 'email', 'password'];
    types.forEach((type) => () => {
      const tree = create(<Filed type={type} />);
      expect(tree.root.findByType('input').props).toBe(type);
    });
  });

  it('should render proper label', () => {
    const mockID = 'someFancyId';
    const mockLabel = 'someFancyLabel';
    const tree = create(<Field id={mockID} label={mockLabel} />);
    expect(tree.root.findByType('label').props.htmlFor).toBe(mockID);
    expect(tree.root.findByType('input').props.id).toBe(mockID);
    expect(tree.root.findByType('label').children[0]).toBe(mockLabel);
  });

  it('should call handler', () => {
    const handler = jest.fn();
    const tree = create(<Field value={0} onChange={handler} />);
    tree.root.findByType('input').props.onChange(1);
    expect(handler).toHaveBeenCalled();
  });
});

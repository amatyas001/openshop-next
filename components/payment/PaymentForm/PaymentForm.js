import PropTypes from 'prop-types';
import { Box, Flex } from '@chakra-ui/core';
import { Field, Spinner, PaymentFormControls } from '@app/components';

/**
 * Default input list
 *
 * @ignore
 */
const _fields = [
  {
    name: 'name',
    type: 'text',
    placeholder: 'John Doe',
  },
  {
    name: 'address',
    type: 'text',
    placeholder: 'J191 S. Illinois Street, Everett, MA 02149',
  },
  ,
  {
    name: 'email',
    type: 'email',
    placeholder: 'johndoe@example.com',
  },
  {
    name: 'phone',
    type: 'tel',
    placeholder: '(941) 555-0123',
  },
];

/**
 * Displays a form which collecting billing details from the user amd
 * [PaymentFormControls](#paymentformcontrols) component to handle submit.
 *
 * ***State Dependencies***
 * - `payment.status === 'form'`
 *
 * ***Wrapped Components***
 * - [Field](#field)
 * - [PaymentFormControls](#paymentformcontrols)
 *
 * @example
 * ```jsx
 * <PaymentForm />
 * ```
 */
export const PaymentForm = (props) => {
  const { fields = _fields } = props;
  const [loading, setLoading] = React.useState(false);
  const [details, setDetails] = React.useState({
    address: '',
    email: '',
    name: '',
    phone: '',
  });

  return !loading ? (
    <Flex
      as='form'
      flexDirection='column'
      alignItems='center'
      mx='auto'
      width={{ sm: '100%', lg: '80%' }}
      {...props}
    >
      <Box
        as='fieldset'
        border='0'
        width='100%'
        mb='10px'
        borderBottom='1px'
        borderColor='gray.400'
      >
        {fields.map((item) => (
          <Field
            data-testid='input'
            key={item.name}
            label={item.name}
            id={item.name}
            type={item.type}
            placeholder={item.placeholder}
            required
            value={details[item.name]}
            onChange={(e) => {
              setDetails({ ...details, [item.name]: e.target.value });
            }}
          />
        ))}
      </Box>
      <PaymentFormControls setLoading={setLoading} details={details} />
    </Flex>
  ) : (
    <Spinner data-testid='form-spinner' text='Sending data...' />
  );
};

PaymentForm.propTypes = {
  /**
   * Arryas of input field descriptions to generate [Fileds](#field)
   */
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isReguired,
      type: PropTypes.string.isReguired,
      placeholder: PropTypes.string.isReguired,
    })
  ),
};

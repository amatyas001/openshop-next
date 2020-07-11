import { Box, Flex } from '@chakra-ui/core';
import { PAYMENT_FIELDS } from '@app/config';
import { Field, Spinner, PaymentFormControls } from '@app/components';
import { FieldShape } from '@app/lib/types';

/**
 * Displays a form which collecting billing details from the user amd
 * [PaymentFormControls](#paymentformcontrols) component to handle submit.
 *
 * @visibleName Payment Form
 * @example
 * ```jsx
 * <PaymentForm />
 * ```
 */
export const PaymentForm = (props) => {
  const { fields } = props;
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

PaymentForm.defaultProps = {
  fields: PAYMENT_FIELDS,
};

PaymentForm.propTypes = {
  /**
   * Arryas of input field descriptions to generate [Fileds](#field)
   */
  fields: FieldShape,
};

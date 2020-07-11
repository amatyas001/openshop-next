import PropTypes from 'prop-types';
import { Image as ChakraImage } from '@chakra-ui/core';
import { Spinner } from '@app/components';

/**
 * Renders and image or a spinner if its still loading
 *
 * @example
 * ```jsx
 * <Image src='/path/to/image.pgng'>
 */
export const Image = (props) => {
  const [loading, setLoading] = React.useState(true);
  return (
    <>
      {
        /* istanbul ignore next */ loading && (
          <Spinner
            width={{ sm: 'auto', xl: '20%' }}
            height='200px'
            m='auto'
            label='Loading content'
            {...props}
          />
        )
      }
      <ChakraImage
        d={/* istanbul ignore next */ loading ? `none` : 'block'}
        width={{ sm: 'auto', xl: '20%' }}
        height='200px'
        objectFit='contain'
        rounded='md'
        onLoad={/* istanbul ignore next */ () => setLoading(false)}
        {...props}
      />
    </>
  );
};

Image.propTypes = {
  /**
   * Absolute path of the image (in `public` directory)
   */
  src: PropTypes.string.isRequired,
};

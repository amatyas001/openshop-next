import PropTypes from 'prop-types';
import { Flex } from '@chakra-ui/core';
import * as COLORS from '@app/config/colors';

/**
 * @see https://amatyas001.github.io/openshop-next/#section-configuration
 * @ignore
 */
export const Content = (props) => {
  const { children } = props;
  return (
    <Flex
      position='relative'
      align='center'
      alignItems='start'
      flexDirection='column'
      justifyContent='center'
      bg={COLORS.BG.light}
      {...props}
    >
      <Flex
        flexDirection='column'
        justifyContent='start'
        width={{ sm: '100%', lg: '80%' }}
        mx='auto'
        mt='60px'
        bg='white'
        boxShadow='0 -7px 15px #9F7AEA'
        minHeight={{ lg: '600px' }}
        data-testid='content'
      >
        {children}
      </Flex>
    </Flex>
  );
};

Content.propTypes = {
  /**
   * Current content
   */
  children: PropTypes.element.isRequired,
};

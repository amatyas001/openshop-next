import Link from 'next/link';
import {
  Flex,
  Box,
  Heading,
  Link as ChakraLink,
  List,
  ListItem,
  SimpleGrid,
} from '@chakra-ui/core';
import { FOOTER_SECTIONS } from '@app/config';
import * as COLORS from '@app/config/colors';

/**
 * Displays a footer layout element at the bottom every page
 *
 * @see https://amatyas001.github.io/openshop-next/#section-configuration
 */
export const Footer = (props) => {
  return (
    <>
      <SimpleGrid
        as='footer'
        data-testid='footer'
        minHeight='200px'
        py='2rem'
        px={{ sm: '2%' }}
        bg={COLORS.BG.dark}
        color={COLORS.TEXT.dark}
        borderTop='1px'
        borderTopColor={COLORS.SPACER.dark}
        columns={FOOTER_SECTIONS.length}
        {...props}
      >
        {FOOTER_SECTIONS.map((section) => (
          <Flex
            data-testid='footer-section'
            as='section'
            key={section.title}
            mx='auto'
            flexDirection='column'
          >
            <Heading data-testid='footer-section-title' fontSize='1.5rem'>
              <Box
                data-testid='footer-section-icon'
                as={section.icon}
                mb='-5px'
                mr='5px'
              />
              {section.title}
            </Heading>
            <List spacing={3} px={{ sm: '0' }} mb={{ sm: '50px', lg: '20px' }}>
              {section.elements.map((element) => (
                <ListItem data-testid='footer-element' key={element.text}>
                  <Link href={element.link} passHref>
                    <ChakraLink
                      data-testid='footer-element-link'
                      color={COLORS.TEXT.dark}
                    >
                      {element.text}
                    </ChakraLink>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Flex>
        ))}
      </SimpleGrid>
    </>
  );
};

import { Flex, Text } from '@chakra-ui/core';
import { FaStar } from 'react-icons/fa';

export const Rating = (props) => {
  const ratings = [];

  for (let i = 0; i < Math.floor(props.ratings); i++) {
    ratings.push(<Text key={i} {...props} as={FaStar}></Text>);
  }

  return <Flex alignItems='end'>{ratings}</Flex>;
};

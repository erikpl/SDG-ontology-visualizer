import React from 'react';
import { Flex, Icon, Text } from '@chakra-ui/react';
import { GoPrimitiveDot } from 'react-icons/go';

type GraphNodeKeyProps = {
  description: string;
  hex: string;
};

const GraphNodeKey: React.FC<GraphNodeKeyProps> = ({ description, hex }: GraphNodeKeyProps) => (
  <Flex align="center">
    <Icon as={GoPrimitiveDot} w={12} h={12} color={hex} />
    <Text fontSize="sm">{description}</Text>
  </Flex>
);

export default GraphNodeKey;

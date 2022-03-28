import { Flex, Heading, Stack, Text, Image } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { MotionBox } from '../../types/react/componentTypes';
// import SearchBar from '../atoms/SearchBar';
import DocumentList from '../molecules/DocumentList';

const Documents: React.FC = () => {
  const selectedSDG = useSelector((state: RootState) => state.ontology.selectedSDG);
  const selectedSubgoal = useSelector((state: RootState) => state.ontology.selectedSubGoal);
  return (
    <Stack spacing="10">
      <Flex
        align="left"
        justify="left"
        justifyContent="space-evenly"
        spacing="10"
        bg="cyan.700"
        padding="50px"
      >
        <MotionBox p={0}>
          <Image
            src={selectedSDG?.icon}
            borderRadius="lg"
            overflow="hidden"
            alt={selectedSDG?.label}
            boxSize="100"
            object-fit="cover"
          />
        </MotionBox>
        <Stack spacing="4" width="90%">
          <Heading size="lg" color="white">
            <span>Delmål&nbsp;</span>
            {selectedSubgoal?.SubjectLabel}
          </Heading>
          <Text fontSize="md" color="white">
            {selectedSubgoal?.description}
          </Text>
        </Stack>
      </Flex>
      <DocumentList />
    </Stack>
  );
};
export default Documents;



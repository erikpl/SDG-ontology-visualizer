import { Flex, Heading, Stack, Text, Image } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useTranslation from '../../hooks/translations';
import { RootState } from '../../state/store';
import { MotionBox } from '../../types/react/componentTypes';
import DocumentList from '../molecules/DocumentList';

const Documents: React.FC = () => {
  const history = useHistory();
  const selectedSDG = useSelector((state: RootState) => state.ontology.selectedSDG);
  const selectedSubgoal = useSelector((state: RootState) => state.ontology.selectedSubGoal);
  const translations = useTranslation(); 

  return (
    <Stack spacing="10">
      <Flex
        align="left"
        justify="left"
        justifyContent="space-between"
        spacing="10"
        bg="cyan.700"
        padding="50px"
      >
        <MotionBox
          p={0}
          whileHover={{ scale: 1.05 }}
          _hover={{
            cursor: 'pointer',
          }}
          onClick={() => history.push('/ontology')}
        >
          <Image
            src={translations.getString('icon_'.concat((selectedSDG!.instancesOf.slice(selectedSDG!.instancesOf.indexOf('B') + 1))))} 
            borderRadius="lg"
            overflow="hidden"
            alt={translations.getString(selectedSDG!.instancesOf.slice(selectedSDG!.instancesOf.indexOf('B') + 1))}
            boxSize="200"
            marginRight="5"
            object-fit="cover"
          /> 
        </MotionBox>
        <Stack spacing="4" width="90%" marginLeft='20px'>
          <Heading size="lg" color="white">
            {translations.getString('Target').concat(' ')}
            {selectedSubgoal?.SubjectLabel}
          </Heading>
          <Text fontSize="md" color="white"> 
            {translations.getString('desc'.concat(selectedSDG!.instancesOf.slice(selectedSDG!.instancesOf.indexOf('B') + 1).toString()))} 
          </Text>
        </Stack>
      </Flex>
      <Stack>
        <DocumentList />
      </Stack>
    </Stack>
  );
};
export default Documents;



/* eslint-disable */
import { CheckCircleIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getRelatedSubgoalsForDocument } from '../../api/ontologies';
import { Document, SubGoal } from '../../types/ontologyTypes';

type DocumentBoxProps = {
  commonCelexDocuments: Document[][];
};

const DocumentBox: React.FC<DocumentBoxProps> = ({ commonCelexDocuments }: DocumentBoxProps) => {
  const [relatedGoals, setRelatedGoals] = useState<Array<Array<SubGoal>>>([]);
  const history = useHistory();

  const onClickSeeRelatedGoals = async (document: Document) => {
    console.log('pressed');
    if (relatedGoals.length === 0){
      const goals = await getRelatedSubgoalsForDocument(document.url);
      setRelatedGoals(goals);
    }
  };

  const getGoalLabelFromSubgoal = (subgoal: SubGoal) => subgoal.SubjectLabel.slice(0, subgoal.SubjectLabel.indexOf('.'));
  

  return (
    <Accordion allowMultiple allowToggle width="55%" onChange={() => onClickSeeRelatedGoals(commonCelexDocuments[0][0])}>
      <AccordionItem boxShadow="lg" borderWidth="2px" borderRadius="md" borderColor="cyan.700">
        <AccordionButton borderRadius="md" _hover={{ opacity: '75%' }}>
          <Heading as="h3" size="sm">
            {commonCelexDocuments[0][0].title}
          </Heading>
          <Badge>{commonCelexDocuments[0][0].language}</Badge>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <Stack spacing="5">
            <Text size="md">
              <CheckCircleIcon color="green.400" />
              &nbsp;Aktiv
            </Text>
            <Flex justify="space-evenly">
              {commonCelexDocuments[0].map(document => (
                <Button bg="cyan.700" color="white" _hover={{ opacity: '75%' }}>
                  <a href={document.url} target="_blank" rel="noreferrer">
                    Åpne som&nbsp;
                    {document.format}
                  </a>
                </Button>
              ))}
              </Flex>
                <AccordionItem>
                  <AccordionButton>
                    Se relaterte mål
                    <AccordionIcon />
                  </AccordionButton>
                   <AccordionPanel>
                   <VStack align="start">
                    {relatedGoals.map(subgoalList => (
                      <HStack align="start">
                        <Box width="20px" textAlign="end">{getGoalLabelFromSubgoal(subgoalList[0])}</Box>
                        {subgoalList.map(subgoal => (
                          <Tag bgColor="cyan.100" width="40px">{subgoal.SubjectLabel}</Tag>
                          ))}
                      </HStack>
                    ))}
                     </VStack>
                </AccordionPanel>
                </AccordionItem>
              
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default DocumentBox;

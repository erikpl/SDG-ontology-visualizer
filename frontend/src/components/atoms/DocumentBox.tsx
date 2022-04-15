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
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getRelatedSubgoalsForDocument, getSustainabilityGoal } from '../../api/ontologies';
import { mapSustainabilityGoalToNode } from '../../common/node';
import useTranslation from '../../hooks/translations';
import { setError } from '../../state/reducers/apiErrorReducer';
import { selectNode, selectSDG, selectSubgoal } from '../../state/reducers/ontologyReducer';
import { Document, SubGoal, SustainabilityGoal } from '../../types/ontologyTypes';

type DocumentBoxProps = {
  commonCelexDocuments: Document[][];
};

const DocumentBox: React.FC<DocumentBoxProps> = ({ commonCelexDocuments }: DocumentBoxProps) => {
  const [relatedGoals, setRelatedGoals] = useState<Array<Array<SubGoal>>>([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const translations = useTranslation(); 

  const onClickSeeRelatedGoals = async (document: Document) => {
    if (relatedGoals.length === 0){
      let goals = await getRelatedSubgoalsForDocument(document.url);
      setRelatedGoals(goals);
    }
  };

  const getGoalLabelFromSubgoal = (subgoal: SubGoal) => subgoal.SubjectLabel.slice(0, subgoal.SubjectLabel.indexOf('.'));
  
  const formatTitle = (title: string) => {
    const tokens = title.split(" ");
    if (tokens.length > 50) {
      return tokens.slice(0, 50).join(" ") + "...";
    } else {
      return title;
    }
  }

  const onClickSubGoal = async (subgoal: SubGoal) => {
    const goal = await getSustainabilityGoal(getGoalLabelFromSubgoal(subgoal));
    dispatch(selectSDG(goal[0]));
    dispatch(selectSubgoal(subgoal));
  };

  return (
    <Accordion allowMultiple allowToggle width="80%" onChange={() => onClickSeeRelatedGoals(commonCelexDocuments[0][0])}>
      <AccordionItem boxShadow="lg" borderWidth="2px" borderRadius="md" borderColor="cyan.700">
        <AccordionButton borderRadius="md" _hover={{ opacity: '75%' }}>
          <Heading as="h3" size="sm">
            {formatTitle(commonCelexDocuments[0][0].title)}
          </Heading>
          <Badge>{commonCelexDocuments[0][0].language}</Badge>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <Stack spacing="5">
            <Text size="md">
              <CheckCircleIcon color="green.400" />
              &nbsp;{translations.getString('Active')}
            </Text>
            <Flex justify="space-evenly">
              {commonCelexDocuments[0].map(document => (
                <Button bg="cyan.700" color="white" _hover={{ opacity: '75%' }}>
                  <a href={document.url} target="_blank" rel="noreferrer">
                  {translations.getString('OpenAs')}&nbsp;
                    {document.format}
                  </a>
                </Button>
              ))}
              </Flex>
                <AccordionItem>
                  <AccordionButton>
                      {translations.getString('SeeRelatedGoals')}
                    <AccordionIcon />
                  </AccordionButton>
                   <AccordionPanel>
                   <VStack align="start" justify="center"> 
                    {relatedGoals.map(subgoalList => (
                      <HStack align="start">
                        <Text width="20px" textAlign="end" fontWeight="bold">{getGoalLabelFromSubgoal(subgoalList[0])}</Text>
                        {subgoalList.map(subgoal => (
                          <Button bgColor="cyan.100" width="40px" height="20px"
                          onClick={() => {
                            window.scrollTo(0, 0);
                            onClickSubGoal(subgoal);
                            history.push('/documents');
                          }}>{subgoal.SubjectLabel}</Button>
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

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Heading,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import colorSwitcher from '../../common/colorSwitcher';
import useTranslation from '../../hooks/translations';
import { selectSubgoal } from '../../state/reducers/ontologyReducer';
import { RootState } from '../../state/store';
import { SubGoal } from '../../types/ontologyTypes';

type SubGoalContainerProps = {
  subGoalNode: SubGoal;
};

const SubGoalContainer: React.FC<SubGoalContainerProps> = ({
  subGoalNode,
}: SubGoalContainerProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const translations = useTranslation(); 

  const selectedNode = useSelector((state: RootState) => state.ontology.selectedNode);
  const onClickSubGoal = (subgoal: SubGoal) => {
    dispatch(selectSubgoal(subgoal));
  };

  const getSubgoalDescription = () => translations.getString('target'.concat(subGoalNode.SubjectLabel.replace('.', '_')));

  return (
    <Accordion allowToggle backgroundColor='white'>
      <AccordionItem boxShadow="lg" borderRadius="md">
        <AccordionButton
          _expanded={{ borderBottomRadius: '0' }}
          borderRadius="md"
          bg={colorSwitcher(selectedNode! && selectedNode.id)}
          color="white"
          _hover={{ opacity: '75%' }}
        >
          <Heading as="h3" size="sm">
            {subGoalNode.SubjectLabel}
          </Heading>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <Text fontSize="sm">{getSubgoalDescription()}</Text>
          <Text
            style={{ color: 'cornflowerBlue', textAlign: 'center', fontSize: 'sm', marginTop: '10px' }}
            _hover={{
              cursor: 'pointer',
            }}
            onClick={() => {
              onClickSubGoal(subGoalNode);
              window.scrollTo(0, 0);
              history.push('/documents');
            }}
          >
            {translations.getString('ShowDocuments')}
          </Text>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default SubGoalContainer;

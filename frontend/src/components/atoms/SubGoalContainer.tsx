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

  const selectedNode = useSelector((state: RootState) => state.ontology.selectedNode);
  const onClickSubGoal = (subgoal: SubGoal) => {
    dispatch(selectSubgoal(subgoal));
  };

  return (
    <Accordion allowToggle>
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
          <Text fontSize="sm">{subGoalNode.description}</Text>
          <Text
            style={{ color: 'blue', textAlign: 'right', fontSize: 'sm' }}
            _hover={{
              cursor: 'pointer',
            }}
            onClick={() => {
              onClickSubGoal(subGoalNode);
              window.scrollTo(0, 0);
              history.push('/documents');
            }}
          >
            Vis dokumenter
          </Text>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default SubGoalContainer;

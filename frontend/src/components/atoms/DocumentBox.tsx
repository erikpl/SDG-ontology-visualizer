import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Heading,
} from '@chakra-ui/react';
import React from 'react';
/* import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { SubGoal } from '../../types/ontologyTypes'; */

/* type DocumentBoxProps = {
  subGoalNode: SubGoal;
}; */

const DocumentBox: React.FC = () => (
  <Accordion allowToggle>
    <AccordionItem boxShadow="lg" borderRadius="md">
      <AccordionButton
        _expanded={{ borderBottomRadius: '0' }}
        borderRadius="md"
        _hover={{ opacity: '75%' }}
      >
        <Heading as="h3" size="sm">
          Random Heading
        </Heading>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>Random filler text</AccordionPanel>
    </AccordionItem>
  </Accordion>
);

export default DocumentBox;

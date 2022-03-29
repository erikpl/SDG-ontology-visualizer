import { CheckCircleIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { Document } from '../../types/ontologyTypes';

type DocumentBoxProps = {
  document: Document;
};

const DocumentBox: React.FC<DocumentBoxProps> = ({ document }: DocumentBoxProps) => (
  <Accordion allowToggle width="55%">
    <AccordionItem boxShadow="lg" borderWidth="2px" borderRadius="md" borderColor="cyan.700">
      <AccordionButton borderRadius="md" _hover={{ opacity: '75%' }}>
        <Heading as="h3" size="sm">
          {document.title}
        </Heading>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <Stack spacing="5">
          <Text size="md">
            <CheckCircleIcon color="green.400" />
            &nbsp;Aktiv
          </Text>
          <Flex justify="space-evenly">
            <Button bg="cyan.700" color="white" _hover={{ opacity: '75%' }}>
              <a href={document.url} target="_blank" rel="noreferrer">
                Åpne som &nbsp;
                {document.format}
              </a>
            </Button>
          </Flex>
        </Stack>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

export default DocumentBox;

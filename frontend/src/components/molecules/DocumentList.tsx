import { ArrowUpIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDocumentsForSubgoal } from '../../api/ontologies';
import { RootState } from '../../state/store';
import { Document } from '../../types/ontologyTypes';
import DocumentBox from '../atoms/DocumentBox';

const DocumentList: React.FC = () => {
  const [docList, setDocList] = useState<Array<Array<Array<Document>>>>([]);
  const selectedSubgoal = useSelector((state: RootState) => state.ontology.selectedSubGoal);
  const langList = ['ENG', 'DAN', 'NLD', 'ITA', 'DEU'];
  const pageNum = 1;
  
  const loadDocuments = async () => {
    if (!selectedSubgoal) return;
      setDocList([]);
      const data = await getDocumentsForSubgoal(selectedSubgoal.SubjectLabel, langList, pageNum);
      setDocList(data);
  };

  useEffect(() => {
    (async () => {
      await loadDocuments();
    } 
    )();
  }, [selectedSubgoal]);

  if (!docList || docList.length === 0) {
    return (
      <Box align="center" px="10">
        <Heading size="lg" mb="10" color="cyan.700">
          Laster dokumenter...
        </Heading>
      </Box>
    );
  }

  return (
    <Stack align="center" spacing="7">
      <Box align="center" px="10">
        <Heading size="lg" color="cyan.700">
          Dokumenter
        </Heading>
      </Box>
      {docList.map((commonCelexDocuments) => (
        <DocumentBox commonCelexDocuments={commonCelexDocuments} />
      ))}
      <Button onClick={() => (window.scrollTo(0, 0))}>
        <Flex justifyContent="space-around">
          Til toppen &nbsp;
          <ArrowUpIcon />
        </Flex>
      </Button>
    </Stack>
  );
};

export default DocumentList;

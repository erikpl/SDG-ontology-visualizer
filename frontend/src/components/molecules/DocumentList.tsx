import { Box, Flex, Heading, Stack } from '@chakra-ui/react';
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
    const data = await getDocumentsForSubgoal(selectedSubgoal.SubjectLabel, langList, pageNum);
    console.log(data);
    // TODO: remove once you make the pretty boxes, this just flattens the list of lists
    // const allDocs: Document[] = data.flat(3);
    // const test = await getRelatedSubgoalsForDocument(allDocs[0].url);
    // console.log(test);
    setDocList(data);
  };

  useEffect(() => {
    loadDocuments();
  }, [selectedSubgoal]);

  if (!docList || docList.length === 0) {
    return <Box height="200px" />;
  }

  return (
    <Stack align="center" spacing="7">
      <Box align="center" px="10">
        <Heading size="lg" mb="10" color="cyan.700">
          Dokumenter
        </Heading>
      </Box>
      {docList.map((commonCelexDocuments) => (
        <DocumentBox commonCelexDocuments={commonCelexDocuments} />
      ))}
      <Flex justifyContent="space-around">
        Side &nbsp;
        {pageNum}
      </Flex>
    </Stack>
  );
};

export default DocumentList;

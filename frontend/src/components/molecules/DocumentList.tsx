import { AddIcon, ArrowUpIcon, SearchIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, Input, InputGroup, InputLeftElement, Spinner, Stack } from '@chakra-ui/react';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDocumentsForSubgoal } from '../../api/ontologies';
import { RootState } from '../../state/store';
import { Document, ISO6392TCode } from '../../types/ontologyTypes';
import DocumentBox from '../atoms/DocumentBox';

const DocumentList: React.FC = () => {
  const { languagePriorities } = useSelector((state: RootState) => state.languages);
  const [docList, setDocList] = useState<Array<Array<Array<Document>>>>([]);
  const [filteredDocList, setFilteredDocList] = useState<Array<Array<Array<Document>>>>([]);
  const selectedSubgoal = useSelector((state: RootState) => state.ontology.selectedSubGoal);
  const [pageNum, setPageNum] = useState<number>(1);
  const [searchResultsText, setSearchResultsText] = useState<string>('');
  const [noMoreDocuments, setNoMoreDocuments] = useState<boolean>(false);
  
  // You have to reset the lists before setting them because react :)
  const resetDocumentLists = () => {
    setFilteredDocList([]);
    setDocList([]);
  };

  const formatLanguages = () => {
    const languages: string[] = languagePriorities.map(language => ISO6392TCode[language.ISO_639_2T]);
    return languages;
  };

  const loadDocuments = async (loadMore: boolean) => {
    if (!selectedSubgoal) return;
    if (loadMore) {

      const oldDocs = docList;
      const numberOfDocuments = docList.length;
      const data = await getDocumentsForSubgoal(selectedSubgoal.SubjectLabel, formatLanguages(), pageNum);
      resetDocumentLists();
      
      
      setDocList(oldDocs.concat(data));
      setFilteredDocList(oldDocs.concat(data));

      setNoMoreDocuments(numberOfDocuments <= docList.length);

    } else {
      resetDocumentLists();
      const data = await getDocumentsForSubgoal(selectedSubgoal.SubjectLabel, formatLanguages(), pageNum);
   
      setDocList(data);
      // Deep cloning just in case 
      setFilteredDocList(JSON.parse(JSON.stringify(data)));
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setFilteredDocList([]);
      setFilteredDocList(docList);
      setSearchResultsText('');
      return;
    }

    const filteredDocs: Array<Array<Array<Document>>> = [];
    for (let i = 0; i < docList.length; i += 1) {
      const langArrays = docList[i];
      langArrays.forEach(langArray => {
        langArray.forEach(langDoc => {
          if (langDoc.title.toLowerCase().includes(e.target.value.toLowerCase()) && !filteredDocs.includes(langArrays)) {
            filteredDocs.push(langArrays);
          }
        });
      });
    }
    setFilteredDocList([]);
    setFilteredDocList(filteredDocs);
    setSearchResultsText(`Søket ditt ga ${filteredDocList.length} resultater.`);
  };

  const updatePaging = () => {
    let count = 0;
    docList.forEach(languageList => languageList.forEach((formatList) => { count += formatList.length;} ));
    setPageNum(count);
  };

  useEffect(() => {
    (async () => {
      await loadDocuments(false);
    } 
    )();
  }, [selectedSubgoal, languagePriorities]);

  useEffect(() => {
    if (pageNum > 1) {
      (async () => {
        await loadDocuments(true);
      } 
      )();
    }
  }, [pageNum]);

  if (!docList || docList.length === 0) {
    return (
      <Box align="center" px="10">
        <Heading size="lg" mb="10" color="cyan.700">
          Laster dokumenter...
          <Spinner />
        </Heading>
      </Box>
    );
  }

  return (
    <Flex direction="row" align="flex-start">
      <Stack align="end" spacing="7" margin="0" width="300%" paddingRight="20">
        <Box align="center" px="10" marginRight="30%">
          <Heading size="lg" color="cyan.700">
            Dokumenter
          </Heading>
        </Box>
        {filteredDocList.map((commonCelexDocuments) => (
          <DocumentBox commonCelexDocuments={commonCelexDocuments} />
        ))}
        <Flex direction="row">
          <Button onClick={() => (window.scrollTo(0, 0))} marginRight="5">
            <Flex justifyContent="space-around">
              Til toppen &nbsp;
              <ArrowUpIcon />
            </Flex>
          </Button>
          <Button onClick={updatePaging} marginLeft="5" isDisabled={noMoreDocuments}>
            <Flex justifyContent="space-around">
              Se flere &nbsp;
              <AddIcon />
            </Flex>
          </Button>
        </Flex>
      </Stack>
      <Stack marginRight="10" width="70%" direction="column">
        <InputGroup>
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
          <Input placeholder='søk i dokumenter' onChange={handleSearch} />
        </InputGroup>
        <Box>
          {searchResultsText}
        </Box>
      </Stack>
    </Flex>
  );
};

export default DocumentList;

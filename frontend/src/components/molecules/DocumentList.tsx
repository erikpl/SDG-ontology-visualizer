import { Box, Heading, Stack } from '@chakra-ui/react';
import React from 'react';
import DocumentBox from '../atoms/DocumentBox';

const DocumentList: React.FC = () => (
  <Stack align="center">
    <Box align="center" px="10">
      <Heading size="lg" mb="10" color="cyan.700">
        Dokumenter
      </Heading>
    </Box>
    <DocumentBox />
  </Stack>
);

export default DocumentList;

import { Box, Heading, Link, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { GoMarkGithub } from 'react-icons/go';
import useTranslation from '../../hooks/translations';

const About = () => {
  const translations = useTranslation(); 

  return (
    <Box py="10%" px="20%">
      <Stack
        spacing="10"
        align="center"
        bg="green.600"
        color="white"
        p="10"
        borderRadius="lg"
        boxShadow="xl"
      >
        <Heading as="h2" size="lg">
          {translations.getString('AboutProject')}
        </Heading>
        <Text fontSize="md" align="left">
          {translations.getString('AboutText')}
        </Text>
        <Link
          href="https://github.com/TDT4290-SDG-Ontology/SDG-ontology-visualizer/"
          isExternal
          color="white"
          _hover={{ opacity: '75%' }}
        >
          <GoMarkGithub size="40" />
        </Link>
      </Stack>
    </Box>
  );
  };

export default About;

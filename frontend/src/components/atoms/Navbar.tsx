/* eslint-disable */
import { InfoIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Link, Spacer } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouteLink, useHistory } from 'react-router-dom';
import { RootState } from '../../state/store';
import { LanguageItem, ISO6392TCode, ISO6391Code } from '../../types/ontologyTypes';
import LanguagePicker from './LanguagePicker';
import useTranslation from "../../hooks/translations";
import LanguagesList from '../../localization/languages';
import fs from 'fs';

const Navbar = () => {
  const history = useHistory();
  const [languagesList, setLanguagesList] = useState<Array<LanguageItem>>(LanguagesList);
  const { isFullscreen } = useSelector((state: RootState) => state.fullscreenStatus);

  if (isFullscreen) return <></>;

  return (
    <Flex as="nav" align="center" px="10" py="4">
{/*       <Box>
        <h1>
          <Link fontWeight="bold" color="cyan.700" fontSize="1.5em" as={RouteLink} to="/">
            sdgqa.trondheim.kommune.no
          </Link>
        </h1>
      </Box>
      <Spacer />
      <Box>
        <h1>
          <Link fontWeight="bold" color="cyan.700" fontSize="1.5em" as={RouteLink} to="/gdc">
            Goal Distance Computation
          </Link>
        </h1>
      </Box>
      <Spacer />
      <Box>
        <h1>
          <Link fontWeight="bold" color="cyan.700" fontSize="1.5em" as={RouteLink} to="/gdc/data">
            Data Upload
          </Link>
        </h1>
      </Box>
      <Spacer />
      <Button
        size="sm"
        color="white"
        bg="cyan.700"
        justify="center"
        leftIcon={<InfoIcon />}
        _hover={{ backgroundColor: 'cyan.600' }}
        onClick={() => {
          history.push('/about');
        }}
      >
        Om
      </Button> */}
      <LanguagePicker languages={languagesList}/>
    </Flex>
  );
};

export default Navbar;



/* eslint-disable */
import { InfoIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Link, Spacer } from '@chakra-ui/react';
import LocalizedStrings from 'react-localization';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouteLink, useHistory } from 'react-router-dom';
import { RootState } from '../../state/store';
import { LanguageItem, ISO6392TCode, ISO6391Code } from '../../types/ontologyTypes';
import LanguagePicker from './LanguagePicker';
import index from '../../localization';
import useTranslation from "../../hooks/translations";
import fs from 'fs';

const Navbar = () => {
  const history = useHistory();
  const [language, setLanguage] = useState<LanguageItem>();
  const [languagesList, setLanguagesList] = useState<Array<LanguageItem>>([]);
  const { isFullscreen } = useSelector((state: RootState) => state.fullscreenStatus);
  const translations = useTranslation(); 

  const loadLanguages = () => {
    let languages: LanguageItem[] = [];
    Promise.all([
      new Promise<void>(async (resolve) => {
          fs.readFile("../..localization/languages.json", {encoding: "utf-8"}, (err, data) => {
              if (err) throw err;
              let rawData = JSON.parse(data);
              let id = 1;
              rawData.forEach((lang: { ISO_639_2T: any; ISO_639_1: any; }) => {
                const ISO_639_2T = lang.ISO_639_2T;
                const ISO_639_1 = lang.ISO_639_1;
                  const language: LanguageItem = {
                      id,
                      ISO_639_2T,
                      ISO_639_1
                  }
                  languages.push(language);
                  id += 1;
              })
          })
          resolve();
      })
  ]).then(() => {
      setLanguagesList(languages);
      setLanguage(languages.find(lang => lang.ISO_639_2T == ISO6392TCode.ENG));
  })
  }


  useEffect(() => {
    // loadLanguages();
    setLanguagesList([{id: 1, ISO_639_1: ISO6391Code.bg, ISO_639_2T: ISO6392TCode.BUL}, 
      {id: 2, ISO_639_1: ISO6391Code.nl, ISO_639_2T: ISO6392TCode.NLD}, 
      {id: 3, ISO_639_1: ISO6391Code.da, ISO_639_2T: ISO6392TCode.DAN}]);
  }, ([]));

  if (isFullscreen) return <></>;

  return (
    <Flex as="nav" align="center" px="10" py="4">
      <Box>
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
      </Button>
      <LanguagePicker languages={languagesList}/>
    </Flex>
  );
};

export default Navbar;



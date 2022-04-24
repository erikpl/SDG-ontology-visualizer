/* eslint-disable */
import { InfoIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Icon, Link, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger, Spacer } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouteLink, useHistory } from 'react-router-dom';
import { RootState } from '../../state/store';
import { LanguageItem } from '../../types/ontologyTypes';
import LanguagePicker from './LanguagePicker';
import LanguagesList from '../../localization/languages';
import fs from 'fs';
import { FaGlobeEurope } from 'react-icons/fa';
import { useLanguageContext } from '../../contexts/LanguageContextProvider';
import useTranslation from '../../hooks/translations';

const Navbar = () => {
  const history = useHistory();
  const [languagesList] = useState<Array<LanguageItem>>(LanguagesList.slice(0,6));
  const { isFullscreen } = useSelector((state: RootState) => state.fullscreenStatus);
  const { language, changeLanguage } = useLanguageContext();
  const translations = useTranslation(); 

  if (isFullscreen) return <></>;

  return (
    <Flex as="nav" align="center" px="10" py="4">
      <Box>
        <h1>
          <Link fontWeight="bold" color="cyan.700" fontSize="1.5em" as={RouteLink} to="/">
            {translations.getString('Home')}
          </Link>
        </h1>
      </Box>
      <Spacer />
      <Box>
        <h1>
          <Link fontWeight="bold" color="cyan.700" fontSize="1.5em" as={RouteLink} to="/gdc">
          {translations.getString('GoalDistanceComputation')}
          </Link>
        </h1>
      </Box>
      <Spacer />
      <Box>
        <h1>
          <Link fontWeight="bold" color="cyan.700" fontSize="1.5em" as={RouteLink} to="/gdc/data">
          {translations.getString('DataUpload')}
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
        marginRight='5'
      >
        {translations.getString('About')}
      </Button>
      <Popover
        closeOnEsc
        defaultIsOpen
        >
        <PopoverTrigger>
          <Button
          size="sm" 
          backgroundColor='cyan.700'
          justify="center"
          color="white"
          _hover={{ backgroundColor: 'cyan.600' }}>
            <FaGlobeEurope />&nbsp;{translations.getString('ChangeLanguage')}
          </Button>
        </PopoverTrigger>
        <PopoverContent marginRight='10'>
          <PopoverArrow />
          <PopoverCloseButton color='cyan.700'/>
          <LanguagePicker languages={languagesList}/>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default Navbar;



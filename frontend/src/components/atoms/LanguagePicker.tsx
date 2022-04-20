/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable */
import { DragDropContext, Droppable, Draggable, DropResult, DraggingStyle, NotDraggingStyle, DraggableLocation } from 'react-beautiful-dnd';
import { Box, Stack, Tag, TagCloseButton, TagLeftIcon, Tooltip } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import React, { Component, useEffect, useState } from 'react';
import Flags from 'country-flag-icons/react/3x2';
import { ISO6391Code, ISO6392TCode, LanguageItem } from '../../types/ontologyTypes';
import useTranslation from '../../hooks/translations';

import { CUIAutoComplete, Item } from 'chakra-ui-autocomplete';
import flagComponents from '../../utils/flagUtils';
import { useLanguageContext } from '../../contexts/LanguageContextProvider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { setLanguagePriorities } from '../../state/reducers/languageReducer';

type LanguagePickerProps = {
  languages: Array<LanguageItem>;
};

const LanguagePicker: React.FC<LanguagePickerProps> = ({
  languages,
}: LanguagePickerProps) => {
  // Default language is norwegian
  const { languagePriorities } = useSelector((state: RootState) => state.languages);
  const dispatch = useDispatch();
  const [selectedLanguageSearchItems, setSelectedLanguageSearchItems] = useState<Item[]>([]);
  const [languageSearchItems, setLanguageSearchItems] = useState<Item[]>([]);
  const { language, changeLanguage } = useLanguageContext();
  const translations = useTranslation(); 

  
  const getItemStyle = (isDraggingOver:boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => ({
    position: 'static',
    margin: '5px',
    userSelect: "none",
    transform: 'none',
    width: 250,
    ...draggableStyle
  } as React.CSSProperties );
  
  const getListStyle = (isDraggingOver:boolean) => ({
    width: 250,
    transform: 'none',
    marginBottom: '10px'
  }) ;
  
  const reorder = (languageList: LanguageItem[], startIndex: number, endIndex: number) => {
    const result = Array.from(languageList);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed)
  
    return result;
  };

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
      const languages = reorder(languagePriorities, result.source.index, result.destination.index);
      const newLanguages = [...languages];
      changeLanguage(ISO6391Code[newLanguages[0].ISO_639_1]);
      dispatch(setLanguagePriorities(newLanguages));
  };

  const convertToItems = (objects: LanguageItem[]) => {
    const languageItems: Item[] = objects.map(language => { 
      return {
        value: ISO6391Code[language.ISO_639_1], 
        label: translations.getString(ISO6391Code[language.ISO_639_1])
      };
    })
    return languageItems;
  };

  const handleSelectedItemsChange = (selectedItems?: Item[]) => {
    if (selectedItems) {
      const newItem = selectedItems.filter(language => !selectedLanguageSearchItems.includes(language))[0];
      const newLanguage = languages.find(language =>  ISO6391Code[language.ISO_639_1] == newItem.value);
      if (newLanguage !== undefined)
      dispatch(setLanguagePriorities(languagePriorities.concat(newLanguage)));
      setLanguageSearchItems([]);
      setLanguageSearchItems(languageSearchItems.filter(item => item.value !== newItem.value));
    } 
  };

  const removeLanguage = (language: LanguageItem) => {
    return (event: React.MouseEvent) => {
      const newLanguagePriorities = languagePriorities.filter(l => l.id != language.id);
      dispatch(setLanguagePriorities(newLanguagePriorities));
      setLanguageSearchItems(languageSearchItems.concat(convertToItems([language])));
      console.log(newLanguagePriorities[0].ISO_639_1);
      changeLanguage(ISO6391Code[newLanguagePriorities[0].ISO_639_1]);
    }
  };
  
  useEffect(() => {
    setLanguageSearchItems(convertToItems(languages.filter(language => !languagePriorities.includes(language))));
  }, []);

  useEffect(() => {
    setLanguageSearchItems(convertToItems(languages.filter(language => !languagePriorities.includes(language))));
  }, [language]);


  const Flag = (l: LanguageItem) => {
    const CountryFlag = flagComponents[l.ISO_3166_1]
    return <CountryFlag />
  }

  return (
    <Box padding='5'>
      <Tooltip label='The language for the site and policy documents' placement='top'>
        <Box fontWeight='medium'>{translations.getString('LanguagePriority')}</Box>
      </Tooltip>
      <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="languageContainer">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {languagePriorities.map((language, index) => (
                  <Draggable key={language.id} draggableId={`${ISO6391Code[language.ISO_639_1]}`} index={index}>
                    {(providedInner, snapshotInner) => (
                      <div
                        ref={providedInner.innerRef}
                        {...providedInner.draggableProps}
                        {...providedInner.dragHandleProps}
                        style={getItemStyle(snapshotInner.isDragging,
                          providedInner.draggableProps.style)}
                      >
                        <Stack direction="row">
                          <Box fontWeight='medium'>{index + 1}</Box>
                          <Tag width='250' backgroundColor='cyan.100'>
                            <TagLeftIcon><Flag {...language} /></TagLeftIcon>
                            {translations.getString(ISO6391Code[language.ISO_639_1])}
                            <TagCloseButton onClick={removeLanguage(language)} />
                          </Tag>  
                        </Stack>
                      </div>
                    )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <CUIAutoComplete
       tagStyleProps={{
        display: 'none',
        rounded: 'full'
        }}
        listStyleProps={{
          overflow: 'auto',
          maxHeight: '100'
        }}
        toggleButtonStyleProps={{
          backgroundColor: 'cyan.600'
        }}
        labelStyleProps={{
          marginBottom: '-3'
        }}
        label={translations.getString('Multilingual').concat('?')}
        placeholder={translations.getString('SearchLanguages')}
        disableCreateItem={true}
        items={languageSearchItems}
        selectedItems={selectedLanguageSearchItems}
        onSelectedItemsChange={(changes) => handleSelectedItemsChange(changes.selectedItems)}
      />
    </Box>
  );
};

export default LanguagePicker;

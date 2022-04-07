/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable */
import { DragDropContext, Droppable, Draggable, DropResult, DraggingStyle, NotDraggingStyle, DraggableLocation } from 'react-beautiful-dnd';
import { Box, Stack, Tag, TagCloseButton, TagLeftIcon } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import React, { Component, useEffect, useState } from 'react';
import Flags from 'country-flag-icons/react/3x2';
import { ISO6391Code, ISO6392TCode, LanguageItem } from '../../types/ontologyTypes';
import useTranslation from '../../hooks/translations';

import { CUIAutoComplete, Item } from 'chakra-ui-autocomplete';
import flagComponents from '../../utils/localizationUtils';
import { useLanguageContext } from '../../contexts/LanguageContext';

type LanguagePickerProps = {
  languages: Array<LanguageItem>;
};

const LanguagePicker: React.FC<LanguagePickerProps> = ({
  languages,
}: LanguagePickerProps) => {
  // const [languagesList] = useState<Array<LanguageItem>>(languages);
  // Default language is english
  const [languagePrioritizer, setlanguagePrioritizer] = useState<Array<LanguageItem>>([languages[5]]);
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
      const languages = reorder(languagePrioritizer, result.source.index, result.destination.index);
      const newLanguages = [...languages];
      changeLanguage(ISO6391Code[newLanguages[0].ISO_639_1]);
      //translations.setLanguage(ISO6391Code[newLanguages[0].ISO_639_1]);
      setlanguagePrioritizer(newLanguages);
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
        setlanguagePrioritizer(languagePrioritizer.concat(newLanguage));
      setLanguageSearchItems([]);
      setLanguageSearchItems(languageSearchItems.filter(item => item.value !== newItem.value));
    } 
  };

  useEffect(() => {

    setLanguageSearchItems(convertToItems(languages));
  }, []);

/*   useEffect(() => {
    translations.setLanguage(ISO6391Code[languagePrioritizer[0].ISO_639_1]);
    console.log(translations.getInterfaceLanguage());
  }, [languagePrioritizer])
 */
  const Flag = (l: LanguageItem) => {
    const CountryFlag = flagComponents[l.ISO_3166_1]
    return <CountryFlag />
  }

  return (
    <Box padding='5'>
      <Box fontWeight='medium'>Language priority</Box>
      <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="languageContainer">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {languagePrioritizer.map((language, index) => (
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
                          <Tag width='250'>
                            <TagLeftIcon><Flag {...language} /></TagLeftIcon>
                            {translations.getString(ISO6391Code[language.ISO_639_1])}
                            <TagCloseButton />
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
        label="Multilingual?"
        placeholder="Search for a language"
        disableCreateItem={true}
        items={languageSearchItems}
        selectedItems={selectedLanguageSearchItems}
        onSelectedItemsChange={(changes) => handleSelectedItemsChange(changes.selectedItems)}
      />
    </Box>
  );
};

export default LanguagePicker;

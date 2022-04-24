/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable arrow-body-style */
import { DragDropContext, Droppable, Draggable, DropResult, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';
import { Box, HStack, IconButton, Stack, Tag, TagCloseButton, TagLeftIcon, Tooltip } from '@chakra-ui/react';
import { CUIAutoComplete, Item } from 'chakra-ui-autocomplete';
import { QuestionOutlineIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { ISO6391Code, LanguageItem } from '../../types/ontologyTypes';
import useTranslation from '../../hooks/translations';
import flagComponents from '../../utils/flagUtils';
import { useLanguageContext } from '../../contexts/LanguageContextProvider';
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
  const [selectedLanguageSearchItems] = useState<Item[]>([]);
  const [languageSearchItems, setLanguageSearchItems] = useState<Item[]>([]);
  const { language, changeLanguage } = useLanguageContext();
  const translations = useTranslation(); 

  
  const getItemStyle = (draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => ({
    position: 'static',
    margin: '5px',
    userSelect: 'none',
    transform: 'none',
    width: 250,
    ...draggableStyle,
  } as React.CSSProperties );
  
  const getListStyle = () => ({
    width: 250,
    transform: 'none',
    marginBottom: '10px',
  }) ;
  
  const reorder = (languageList: LanguageItem[], startIndex: number, endIndex: number) => {
    const result = Array.from(languageList);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
      const reorderedLanguages = reorder(languagePriorities, result.source.index, result.destination.index);
      const newLanguages = [...reorderedLanguages];
      changeLanguage(ISO6391Code[newLanguages[0].ISO_639_1]);
      dispatch(setLanguagePriorities(newLanguages));
  };

  const convertToItems = (objects: LanguageItem[]) => {
    const languageItems: Item[] = objects.map(languageItem => ( { value: ISO6391Code[languageItem.ISO_639_1], label: translations.getString(ISO6391Code[languageItem.ISO_639_1]) }));
    return languageItems;
  };

  const handleSelectedItemsChange = (selectedItems?: Item[]) => {
    if (selectedItems) {
      const newItem = selectedItems.filter(languageItem => !selectedLanguageSearchItems.includes(languageItem))[0];
      const newLanguage = languages.find(languageItem =>  ISO6391Code[languageItem.ISO_639_1] === newItem.value);
      if (newLanguage !== undefined)
      dispatch(setLanguagePriorities(languagePriorities.concat(newLanguage)));
      setLanguageSearchItems([]);
      setLanguageSearchItems(languageSearchItems.filter(item => item.value !== newItem.value));
    } 
  };

  const removeLanguage = (languageItem: LanguageItem) => {
    return (event: React.MouseEvent) => {
      event.preventDefault();
      if (languagePriorities.length === 1) return;
      const newLanguagePriorities = languagePriorities.filter(l => l.id !== languageItem.id);
      dispatch(setLanguagePriorities(newLanguagePriorities));
      setLanguageSearchItems(languageSearchItems.concat(convertToItems([languageItem])));
      changeLanguage(ISO6391Code[newLanguagePriorities[0].ISO_639_1]);
    };
  };
  
  useEffect(() => {
    setLanguageSearchItems(convertToItems(languages.filter(languageItem => !languagePriorities.includes(languageItem))));
  }, []);

  useEffect(() => {
    setLanguageSearchItems(convertToItems(languages.filter(languageItem => !languagePriorities.includes(languageItem))));
  }, [language]);

  const Flag = (l: LanguageItem) => {
    const { ISO_3166_1 } = l;
    const CountryFlag = flagComponents[ISO_3166_1];
    return <CountryFlag />;
  };

  return (
    <Box padding='5'>
      <HStack spacing='0px'>
        <Box fontWeight='medium'>{translations.getString('LanguagePriority')}</Box>
        <Tooltip label={translations.getString('LanguagePriorityInfo')}>
          <IconButton boxSize='30px' icon={<QuestionOutlineIcon color='cyan.700' />} padding='0' marginLeft='210px' backgroundColor='transparent' aria-label='?' />
        </Tooltip> 
      </HStack>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='languageContainer'>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle()}
            >
              {languagePriorities.map((languageItem, index) => (
                <Draggable key={languageItem.id} draggableId={`${ISO6391Code[languageItem.ISO_639_1]}`} index={index}>
                  {(providedInner) => (
                    <div
                      ref={providedInner.innerRef}
                      {...providedInner.draggableProps}
                      {...providedInner.dragHandleProps}
                      style={getItemStyle(providedInner.draggableProps.style)}
                    >
                      <Stack direction='row'>
                        <Box fontWeight='medium'>{index + 1}</Box>
                        <Tag width='250' backgroundColor='cyan.100'>
                          <TagLeftIcon><Flag {...languageItem} /></TagLeftIcon>
                          {translations.getString(ISO6391Code[languageItem.ISO_639_1])}
                          <TagCloseButton onClick={removeLanguage(languageItem)} />
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
        rounded: 'full',
        }}
        listStyleProps={{
          overflow: 'auto',
          maxHeight: '100',
        }}
        toggleButtonStyleProps={{
          backgroundColor: 'cyan.600',
        }}
        labelStyleProps={{
          marginBottom: '-3',
        }}
        label={translations.getString('Multilingual').concat('?')}
        placeholder={translations.getString('SearchLanguages')}
        disableCreateItem
        items={languageSearchItems}
        selectedItems={selectedLanguageSearchItems}
        onSelectedItemsChange={(changes) => handleSelectedItemsChange(changes.selectedItems)}
      />
    </Box>
  );
};

export default LanguagePicker;

/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable */
import { DragDropContext, Droppable, Draggable, DropResult, DraggingStyle, NotDraggingStyle, DraggableLocation } from 'react-beautiful-dnd';
import { Box, Button, Flex, grid, Select, Stack } from '@chakra-ui/react';
import { CopyIcon, DragHandleIcon } from '@chakra-ui/icons';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { ISO6391Code, ISO6392TCode, LanguageItem } from '../../types/ontologyTypes';
import useTranslation from '../../hooks/translations';
import { ObjectType } from 'typescript';

type LanguagePickerProps = {
  languages: Array<LanguageItem>;
};

const LanguagePicker: React.FC<LanguagePickerProps> = ({
  languages,
}: LanguagePickerProps) => {
  const [languagesList] = useState<Array<LanguageItem>>(languages);
  const [languagePrioritizer, setlanguagePrioritizer] = useState<Array<LanguageItem>>([]);
  const translations = useTranslation(); 

  const reorder = (languageList: LanguageItem[], startIndex: number, endIndex: number) => {
    const result = Array.from(languageList);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

  const getItemStyle = (isDragging:boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => ({
    // some basic styles to make the items look a bit nicer
    margin: `0 0 ${grid}px 0`,
  
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",
  
    // styles we need to apply on draggables
    ...draggableStyle
  });
  
  const getListStyle = (isDraggingOver:boolean) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    width: 250
  });

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    
      const languages = reorder(languagePrioritizer, result.source.index, result.destination.index);
      const newLanguages = [...languages];
      setlanguagePrioritizer(newLanguages);
  };

  return (
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
                      <Box>{translations.getString(ISO6391Code[language.ISO_639_1])}</Box>
                    </div>
                  )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default LanguagePicker;

import { Button, Checkbox, HStack } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import useTranslation from '../../hooks/translations';
import { RootState } from '../../state/store';
import SearchBar from '../atoms/SearchBar';
import ShowDropdown from '../atoms/ShowDropdown';
import CorrelationDropdown from './CorrelationDropdown';

type GraphToolBarProps = {
  onSubgoalFilter: () => void;
  onUnlockNodes: React.Dispatch<React.SetStateAction<boolean>>;
  onEdgeLabelsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const GraphToolBar: React.FC<GraphToolBarProps> = ({
  onSubgoalFilter,
  onUnlockNodes,
  onEdgeLabelsVisible,
}: GraphToolBarProps) => {
  const { isFullscreen } = useSelector((state: RootState) => state.fullscreenStatus);
  const translations = useTranslation(); 

  return (
    <HStack
      bg="cyan.700"
      borderRadius={isFullscreen ? 'none' : 'lg'}
      p="3"
      spacing={[null, null, 2, 5, 10]}
    >
      <SearchBar limit={5} />
      <ShowDropdown onSubgoalFilter={onSubgoalFilter} onEdgeLabelsVisible={onEdgeLabelsVisible} />
      <HStack spacing="10" d={['none', 'none', 'none', 'none', 'flex']}>
        <Checkbox colorScheme="cyan" color="white" size="md" checked onChange={onSubgoalFilter}>
          {translations.getString('ShowTargets')}
        </Checkbox>
        <Checkbox
          defaultIsChecked
          colorScheme="cyan"
          color="white"
          size="md"
          onChange={() => onEdgeLabelsVisible((current) => !current)}
        >
          {translations.getString('ShowEdgeLabels')}
        </Checkbox>
      </HStack>
      <CorrelationDropdown isPositive />
      <CorrelationDropdown isPositive={false} />
      <Button
        color="cyan.700"
        bg="white"
        size="sm"
        minW="8em"
        onClick={() => onUnlockNodes((current) => !current)}
      >
        {translations.getString('UnlockNodes')}
      </Button>
    </HStack>
  );
};

export default GraphToolBar;

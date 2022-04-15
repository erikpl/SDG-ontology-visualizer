import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import React from 'react';
import useTranslation from '../../hooks/translations';
import CorrelationCheckbox from '../atoms/CorrelationCheckbox';

interface Props {
  isPositive: boolean;
}

const CorrelationDropdown: React.FC<Props> = ({ isPositive }: Props) => {
  const translations = useTranslation(); 
  
  return (
    <Menu closeOnSelect={false} closeOnBlur autoSelect={false}>
      <MenuButton
        as={Button}
        bg="white"
        size="sm"
        color="cyan.700"
        minW="13.5em"
        rightIcon={<ChevronDownIcon />}
      >
        {isPositive ? translations.getString('positivePlural').concat(' ') : translations.getString('negativePlural').concat(' ')}
        {translations.getString('effects')}
      </MenuButton>
      <MenuList bg="cyan.700">
        <CorrelationCheckbox text={translations.getString('Low')} isPositive={isPositive} index={0} />
        <CorrelationCheckbox text={translations.getString('Moderate')} isPositive={isPositive} index={1} />
        <CorrelationCheckbox text={translations.getString('High')} isPositive={isPositive} index={2} />
      </MenuList>
    </Menu>
  );
  };

export default CorrelationDropdown;

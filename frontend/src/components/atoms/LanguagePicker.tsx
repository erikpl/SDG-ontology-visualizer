import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { LanguageItem } from '../../types/ontologyTypes';

type LanguagePickerProps = {
  languages: Array<LanguageItem>;
};

const LanguagePicker: React.FC<LanguagePickerProps> = ({
  languages,
}: LanguagePickerProps) => {
  const [languagesList, setLanguagesList] = useState<Array<LanguageItem>>([]);

  useEffect(() => {
    setLanguagesList(languages);
  }, []);

  return (
    <Box backgroundColor='blue'>
      Her kjem d ting
    </Box>
  );
};

export default LanguagePicker;

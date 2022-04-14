import React, { useContext, useState } from 'react';
import LanguageContext from './LanguageContext';
/* eslint-disable react/prop-types */

export const useLanguageContext = () => useContext(LanguageContext);

export default function LanguageContextProvider({ children }) {
  const [language, changeLanguage] = useState('en');
  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
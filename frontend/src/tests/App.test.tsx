import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import LanguageContextProvider from '../contexts/LanguageContextProvider';

test('renders without crashing', () => {
 
    render( 
    <LanguageContextProvider>
      <App />
    </LanguageContextProvider>
      );
  
});

import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import store from '../../../state/store';

import LanguagePicker from '../../../components/atoms/LanguagePicker';
import LanguagesList from '../../../localization/languages';
import LanguageContextProvider from '../../../contexts/LanguageContextProvider';

it('renders with a predefined language list', () => {
  const tree = renderer
    .create(
      <LanguageContextProvider>
        <Provider store={store}>
          <LanguagePicker languages={LanguagesList}/>
        </Provider>
      </LanguageContextProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
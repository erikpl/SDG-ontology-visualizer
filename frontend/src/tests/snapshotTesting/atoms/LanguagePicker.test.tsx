import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import store from '../../../state/store';

import LanguagePicker from '../../../components/atoms/LanguagePicker';
import LanguagesList from '../../../localization/languages';

it('renders with a predefined language list', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <LanguagePicker languages={LanguagesList}/>
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import store from '../../../state/store';
import LanguageContextProvider from '../../../contexts/LanguageContextProvider';

import Documents from '../../../components/pages/Documents';

it('renders with no items', () => {
  const tree = renderer
    .create(
      <LanguageContextProvider>
        <Provider store={store}>
          <Documents />
        </Provider>
      </LanguageContextProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

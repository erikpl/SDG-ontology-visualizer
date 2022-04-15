import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import LanguageContextProvider from '../../../contexts/LanguageContextProvider';

import OntologyPage from '../../../components/pages/OntologyPage';
import store from '../../../state/store';

it('renders when there are no items', () => {
  const tree = renderer
    .create(
      <LanguageContextProvider>
        <Provider store={store}>
          <OntologyPage />
        </Provider>
      </LanguageContextProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

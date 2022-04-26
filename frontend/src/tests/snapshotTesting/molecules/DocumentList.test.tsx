import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import store from '../../../state/store';
import LanguageContextProvider from '../../../contexts/LanguageContextProvider';

import DocumentList from '../../../components/molecules/DocumentList';

it('renders with no items', () => {
  const tree = renderer
    .create(
      <LanguageContextProvider>
        <Provider store={store}>
          <DocumentList />
        </Provider>
      </LanguageContextProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

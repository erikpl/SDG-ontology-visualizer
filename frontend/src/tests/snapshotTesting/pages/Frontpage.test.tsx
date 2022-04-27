import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import Frontpage from '../../../components/pages/Frontpage';
import store from '../../../state/store';
import LanguageContextProvider from '../../../contexts/LanguageContextProvider';

it('renders when there are no items', () => {
  const tree = renderer
    .create(
      <LanguageContextProvider>
        <Provider store={store}>
          <Frontpage />
        </Provider>
      </LanguageContextProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

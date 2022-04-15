import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import ErrorModal from '../../../components/atoms/ErrorModal';
import store from '../../../state/store';
import LanguageContextProvider from '../../../contexts/LanguageContextProvider';

it('renders when there are no items', () => {
  const tree = renderer
    .create(
      <LanguageContextProvider>
        <Provider store={store}>
          <ErrorModal />
        </Provider>
      </LanguageContextProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

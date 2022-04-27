import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import SearchBar from '../../../components/atoms/SearchBar';
import store from '../../../state/store';
import LanguageContextProvider from '../../../contexts/LanguageContextProvider';

it('renders when there are no items', () => {
  const tree = renderer
    .create(
      <LanguageContextProvider>
        <Provider store={store}>
          <Router>
            <SearchBar />
          </Router>
        </Provider>
      </LanguageContextProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

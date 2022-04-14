import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Navbar from '../../../components/atoms/Navbar';
import LanguageContextProvider from '../../../contexts/LanguageContextProvider';
import store from '../../../state/store';

it('renders when there are no items', () => {
  const tree = renderer
    .create(
      <LanguageContextProvider>
        <Provider store={store}>
          <Router>
            <Navbar />
          </Router>
        </Provider>
      </LanguageContextProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

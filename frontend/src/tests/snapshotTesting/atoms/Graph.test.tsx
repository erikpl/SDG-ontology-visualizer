import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import Graph from '../../../components/atoms/Graph';
import store from '../../../state/store';
import LanguageContextProvider from '../../../contexts/LanguageContextProvider';

it('renders when there are no items', () => {
  const tree = renderer
    .create(
      <LanguageContextProvider>
        <Provider store={store}>
          <Graph nodeFilter={() => true} />
        </Provider>
      </LanguageContextProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import GraphContainer from '../../../components/molecules/GraphContainer';
import store from '../../../state/store';
import LanguageContextProvider from '../../../contexts/LanguageContextProvider';

it('renders when there are no items', () => {
  const tree = renderer
    .create(
      <LanguageContextProvider>
        <Provider store={store}>
          <GraphContainer />
        </Provider>
      </LanguageContextProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

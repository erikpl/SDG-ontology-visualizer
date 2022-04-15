import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import GraphToolbar from '../../../components/molecules/GraphToolbar';
import store from '../../../state/store';
import LanguageContextProvider from '../../../contexts/LanguageContextProvider';

it('renders when there are no items', () => {
  const tree = renderer
    .create(
      <LanguageContextProvider>
        <Provider store={store}>
          <GraphToolbar onSubgoalFilter={() => {}} />
        </Provider>
      </LanguageContextProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

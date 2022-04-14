import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import store from '../../../state/store';

import DocumentList from '../../../components/molecules/DocumentList';

it('renders with no items', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <DocumentList />
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
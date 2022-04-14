import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import store from '../../../state/store';

import Documents from '../../../components/pages/Documents';

it('renders with no items', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Documents />
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
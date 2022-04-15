import React from 'react';
import renderer from 'react-test-renderer';
import { Route, MemoryRouter } from 'react-router-dom';
import LanguageContextProvider from '../../../contexts/LanguageContextProvider';

import GDCViewMunicipality from '../../../components/pages/GDCViewMunicipality';

it('renders when there are no items', () => {
  const tree = renderer
    .create(
      <LanguageContextProvider>
        <MemoryRouter initialEntries={['gdc/view/no.5001']}>
          <Route path="gdc/view/:municipality">
            <GDCViewMunicipality />
          </Route>
        </MemoryRouter>
      </LanguageContextProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

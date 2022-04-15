import React from 'react';
import renderer from 'react-test-renderer';
import LanguageContextProvider from '../../../contexts/LanguageContextProvider';
import GDCSelectMunicipality from '../../../components/pages/GDCSelectMunicipality';

it('renders when there are no items', () => {
  const tree = renderer
    .create(
      <LanguageContextProvider>
        <GDCSelectMunicipality />
      </LanguageContextProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

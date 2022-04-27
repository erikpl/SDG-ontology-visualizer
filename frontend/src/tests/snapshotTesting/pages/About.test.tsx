import React from 'react';
import renderer from 'react-test-renderer';
import About from '../../../components/pages/About';
import LanguageContextProvider from '../../../contexts/LanguageContextProvider';

it('renders when there are no items', () => {
  const tree = renderer
    .create(
      <LanguageContextProvider>
        <About />
      </LanguageContextProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

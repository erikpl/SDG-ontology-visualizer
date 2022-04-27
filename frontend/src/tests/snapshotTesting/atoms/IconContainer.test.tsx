import React from 'react';
import renderer from 'react-test-renderer';
import LanguageContextProvider from '../../../contexts/LanguageContextProvider';

import IconContainer from '../../../components/atoms/IconContainer';

const goal1 = {
  instancesOf: 't2',
  label: 'hei',
  icon: 'golum',
};

it('renders when there are no items', () => {
  const tree = renderer
    .create(
      <LanguageContextProvider>
        <IconContainer sustainabilityNode={goal1} onClick={() => {}} />
      </LanguageContextProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

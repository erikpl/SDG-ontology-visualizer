import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import SubGoalContainer from '../../../components/atoms/SubGoalContainer';
import store from '../../../state/store';
import { SubGoal } from '../../../types/ontologyTypes';

const subGoalNode1: SubGoal = {
  id: 't1',
  name: 'hddei',
  type: 'okd1',
  prefix: {
    prefix: 'jdajaa',
    iri: '123d4',
  },
  correlation: 5,
  SubjectLabel: 'eeat',
  description: 'meee',
  Subject: 'vroom'
};

it('renders when there is one item', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <SubGoalContainer subGoalNode={subGoalNode1} />
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

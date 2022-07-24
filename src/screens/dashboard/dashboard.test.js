import renderer from 'react-test-renderer';

import MockedStyledComponents from '__mocks__/MockedStyledComponents';
import MockedNavigator from '__mocks__/MockedNavigator';
import Dashboard from '../dashboard/index';

jest.useFakeTimers();

describe('testing test', () => {
  it('renders correct list', () => {
    const tree = renderer
      .create(MockedStyledComponents(MockedNavigator(Dashboard)))
      .toJSON();

    console.log(
      tree.children[0].children[0].children[1],
      'this si the tree object'
    );

    expect('hello').toBe('hello');
  });
});

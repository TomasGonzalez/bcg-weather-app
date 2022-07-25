import {
  renderHook,
  render,
  screen,
  act,
  fireEvent,
} from '@testing-library/react-native';

import mockStoreState from '__mocks__/mockedStoreValue';
import useStore from 'src/stores/global-store/index';
import useLoadAppData from 'src/hooks/useLoadAppData';

import App from 'App';
jest.mock('src/api');
jest.mock('expo-location');
jest.mock('src/hooks/useLoadAppData');

describe('testing test', () => {
  //Load store with mock data
  beforeEach(() => {
    const { result } = renderHook(() => useStore());
    act(() =>
      useStore.setState({ ...result.current, ...mockStoreState }, true)
    );
    useLoadAppData.mockResolvedValueOnce({});
    render(<App />);
  });

  it('renders the full country list', () => {
    const items = screen.getAllByTestId('listItem');
    expect(items.length).toBe(4);
  });

  it('renders the device location weather', () => {
    const items = screen.getAllByText('Current location');
    expect(items.length).toBe(1);
  });

  it('renders temperature in metric units', () => {
    const item = screen.getByText('21.29°C');
    expect(item).toBeTruthy();
  });
});

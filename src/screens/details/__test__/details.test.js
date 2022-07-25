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
    fireEvent.press(screen.getAllByTestId('listItem')[0]);
  });

  it('renders the temperature', () => {
    expect(screen.getByText('63.93°C'));
  });

  it('renders the weather description', () => {
    expect(screen.getByText('few clouds')).toBeTruthy();
  });

  it('renders the humidity', () => {
    expect(screen.getByText('71%')).toBeTruthy();
  });

  it('renders the visibility', () => {
    expect(screen.getByText('10km')).toBeTruthy();
  });
});

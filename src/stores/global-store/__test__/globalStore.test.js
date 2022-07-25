import { renderHook, act } from '@testing-library/react-native';

import client from 'src/api';
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from 'expo-location';

import useStore from '../index';

import expectedWeatherLocationListAfterDeviceLocation from './expected-data/expectedWeatherLocationListAfterDeviceLocation';
import expectedWeatherFromDeviceLocation from './expected-data/expectedWeatherFromDeviceLocation';
import expectedWeatherLocationListAfterInit from './expected-data/expectedWeatherLocationListAfterInit';
import initializeDefaultWeatherLocationsMock from './api-mocks/initializeDefaultWeatherLocations';

const mockDefaultLocations = [
  { id: 2950159 }, //Berlin
  { id: 3492908 }, //Santo Domingo
];

const mockCurrentPositionAsync = {
  coords: {
    accuracy: 5,
    altitude: 0,
    altitudeAccuracy: -1,
    heading: -1,
    latitude: 37.785834,
    longitude: -122.406417,
    speed: -1,
  },
  timestamp: 1658689261347.5818,
};

jest.mock('src/api');
jest.mock('expo-location');

const initialStoreState = useStore.getState();

/**
 * Zustand store lives independantly from the app so it has to be reseted manually,
 * that's usefull for testing consecutive states changes.
 **/

describe('Testing store', () => {
  beforeEach(() => {
    useStore.setState(initialStoreState, true);
  });

  it('initializes unitSystem correctly', () => {
    const { result } = renderHook(() => useStore());
    expect(result.current.unitSystem).toBe('metric');
  });

  it('changes unitSystem correctly', async () => {
    const { result } = renderHook(() => useStore());
    await act(() => result.current.setUnitSystem('imperial'));
    expect(result.current.unitSystem).toBe('imperial');
  });

  it('initializes default weather location correctly', async () => {
    client.get.mockResolvedValueOnce(initializeDefaultWeatherLocationsMock);

    const { result } = renderHook(() => useStore());

    await act(() =>
      result.current.updateWeatherLocationsByIds(mockDefaultLocations)
    );

    expect(client.get).toHaveBeenCalledWith(`group`, {
      params: {
        id: '2950159,3492908',
        units: 'metric',
      },
    });

    expect(result.current.weatherLocationList).toStrictEqual(
      expectedWeatherLocationListAfterInit
    );
  });

  it('loads user device location weather', async () => {
    requestForegroundPermissionsAsync.mockResolvedValueOnce({
      status: 'granted',
    });
    getCurrentPositionAsync.mockResolvedValueOnce(mockCurrentPositionAsync);
    client.get.mockResolvedValueOnce(expectedWeatherFromDeviceLocation);

    const { result } = renderHook(() => useStore());

    await act(() => result.current.updateUserCoordsWeather());

    expect(requestForegroundPermissionsAsync).toHaveBeenCalled();
    expect(getCurrentPositionAsync).toHaveBeenCalled();

    expect(result.current.weatherLocationList).toStrictEqual(
      expectedWeatherLocationListAfterDeviceLocation
    );
  });
});

import { useMemo, useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { ProfileScreenNavigationProp } from 'src/navigators/main-stack-navigator';
import useStore from 'src/stores/global-store';
import weatherLocationItem from '../components/weather-location-item';
import { WeatherLocationType } from 'types';

const useDashboardLogic = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const refreshing = useStore((store) => store.refreshing);
  const weatherLocationList = useStore((store) => store.weatherLocationList);
  const refreshAllWeatherLocationData = useStore(
    (store) => store.refreshAllWeatherLocationData
  );

  const onRefresh = useCallback(() => refreshAllWeatherLocationData(), []);

  const goToDescription = useCallback(
    (item: WeatherLocationType) => {
      navigation.navigate('Details', { weatherLocationData: item });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: { item: WeatherLocationType }) =>
      weatherLocationItem({ item, onPress: () => goToDescription(item) }),
    [goToDescription]
  );

  const setCurrentLocationToFirst = useMemo(() => {
    const userLocationData =
      weatherLocationList &&
      weatherLocationList.find((item) => !!item?.isUserLocationData);

    const orderedWeatherLocationData = userLocationData
      ? [
          userLocationData,
          ...weatherLocationList.filter((item) => !item.isUserLocationData),
        ]
      : weatherLocationList;

    return orderedWeatherLocationData;
  }, [weatherLocationList]);

  return {
    onRefresh,
    refreshing,
    weatherLocationList: setCurrentLocationToFirst,
    renderItem,
  };
};

export default useDashboardLogic;

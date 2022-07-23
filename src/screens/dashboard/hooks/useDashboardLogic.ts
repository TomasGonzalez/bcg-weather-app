import { useMemo, useCallback, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { ProfileScreenNavigationProp } from 'src/navigators/main-stack-navigator';
import useStore from 'src/stores/global-store';
import { WeatherLocationType } from 'types';

const useDashboardLogic = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const refreshing = useStore((store) => store.refreshing);
  const userLocation = useStore((store) => store.userLocation);
  const updateUserCoordsWeather = useStore(
    (store) => store.updateUserCoordsWeather
  );
  const weatherLocationList = useStore((store) => store.weatherLocationList);
  const refreshAllWeatherLocationData = useStore(
    (store) => store.refreshAllWeatherLocationData
  );

  const goToDescription = useCallback(
    (item: WeatherLocationType) => {
      navigation.navigate('Details', { weatherLocationData: item });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: { item: WeatherLocationType }, LocationComponent) =>
      LocationComponent({ item, onPress: () => goToDescription(item) }),
    [goToDescription]
  );

  const renderHeaderItem = useCallback(
    (HeaderComponent) =>
      !userLocation
        ? HeaderComponent({
            onPress: updateUserCoordsWeather,
          })
        : null,
    [userLocation]
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
    isModalVisible,
    setIsModalVisible,
    onRefresh: refreshAllWeatherLocationData,
    refreshing,
    weatherLocationList: setCurrentLocationToFirst,
    renderItem,
    renderHeaderItem,
  };
};

export default useDashboardLogic;

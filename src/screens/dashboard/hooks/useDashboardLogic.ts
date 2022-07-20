import { useMemo, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { ProfileScreenNavigationProp } from 'src/navigators/main-stack-navigator';
import useStore from 'src/stores/global-store';
import countryItem from '../components/country-item';
import { CountryType } from 'types';

const useDashboardLogic = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { countryList } = useStore();

  const goToDescription = (item: CountryType) => {
    navigation.navigate('Details', { countryData: item });
  };

  const renderItem = useCallback(
    ({ item }: { item: CountryType }) =>
      countryItem({ item, onPress: () => goToDescription(item) }),
    [goToDescription]
  );

  const setCurrentLocationToFirst = useMemo(() => {
    const userLocationData =
      countryList && countryList.find((item) => !!item?.isUserLocationData);

    const orderedCountryData = userLocationData
      ? [
          userLocationData,
          ...countryList.filter((item) => !item.isUserLocationData),
        ]
      : countryList;

    return orderedCountryData;
  }, [countryList]);

  return { countryList: setCurrentLocationToFirst, renderItem };
};

export default useDashboardLogic;

import { RouteProp, useRoute } from '@react-navigation/native';
import moment from 'moment';
import { RootStackParamList } from 'src/navigators/main-stack-navigator';

const useDetailsLogic = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();
  const { weatherLocationData } = route?.params;

  //separate this logic form the view
  const getDateValue = (date: number) => {
    const _date = new Date((date * 1000) as number);
    return moment(_date).format('LT');
  };

  return { weatherLocationData, getDateValue };
};

export default useDetailsLogic;

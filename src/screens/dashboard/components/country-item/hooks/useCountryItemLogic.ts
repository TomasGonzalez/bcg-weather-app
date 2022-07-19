import { ProfileScreenNavigationProp } from 'src/navigators/main-stack-navigator';

const useCountryItemLogic = (navigation: ProfileScreenNavigationProp) => {
  const goToDescription = () => {
    navigation.navigate('Details');
  };
  return { goToDescription };
};

export default useCountryItemLogic;

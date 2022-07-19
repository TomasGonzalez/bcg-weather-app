import useStore from 'src/stores/global-store';

const useDashboardLogic = () => {
  const { countryList } = useStore();

  return { countryList };
};

export default useDashboardLogic;

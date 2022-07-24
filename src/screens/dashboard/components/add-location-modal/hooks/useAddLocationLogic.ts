import { useCallback, useState } from 'react';
import useStore from 'src/stores/global-store';

const useAddLocationLogic = ({
  onRequestClose,
}: {
  onRequestClose: undefined | (() => void);
}) => {
  const [modalText, setModalText] = useState<null | number>(null);
  const updateWeatherLocationsByIds = useStore(
    (store) => store.updateWeatherLocationsByIds
  );

  const addLocationById = useCallback(() => {
    if (modalText) {
      updateWeatherLocationsByIds([{ id: modalText }]);
      onRequestClose && onRequestClose();
    }
  }, [modalText]);
  return { addLocationById, setModalText, modalText };
};

export default useAddLocationLogic;

import React from 'react';
import { Modal, Button, ModalProps } from 'react-native';

import Text from 'src/components/text';
import styled, { ThemeProps } from 'styled-components/native';
import useAddLocationLogic from './hooks/useAddLocationLogic';

const MainContainerTouchableOpacity = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
`;

const StyledInput = styled.TextInput`
  height: 40px;
  padding: 8px;
  border-width: 0.5px;
  border-style: solid;
  border-radius: ${({ theme }: ThemeProps) => theme.borderRadius}px;
  border-color: ${({ theme }: ThemeProps) => theme.colors.contrast};
`;

const ModalView = styled.View`
  padding: ${({ theme }: ThemeProps) => theme.defaultPadding}px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.background};
  border-radius: ${({ theme }: ThemeProps) => theme.borderRadius}px;
`;

const AddLocationModal = ({ onRequestClose, visible }: ModalProps) => {
  const { setModalText, modalText, addLocationById } = useAddLocationLogic({
    onRequestClose,
  });

  return (
    <Modal
      animationType='slide'
      transparent={true}
      onRequestClose={onRequestClose}
      visible={visible}
    >
      <MainContainerTouchableOpacity activeOpacity={0} onPress={onRequestClose}>
        <ModalView>
          <Text>Add Location by Id number: {'\n'}</Text>
          <StyledInput
            keyboardType={'numeric'}
            onChangeText={(value: string) => setModalText(parseInt(value))}
            value={`${modalText || ''}`}
            placeholder={'Enter id number of location.'}
          />
          <Button
            disabled={!modalText}
            title={'send'}
            onPress={addLocationById}
          />
        </ModalView>
      </MainContainerTouchableOpacity>
    </Modal>
  );
};

export default AddLocationModal;

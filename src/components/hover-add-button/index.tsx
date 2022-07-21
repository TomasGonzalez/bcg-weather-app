import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import Text from 'src/components/text';
import styled, { ThemeProps } from 'styled-components';

const AddItemTouchableOpacity = styled.TouchableOpacity`
  position: absolute;
  background-color: ${(props: ThemeProps) => props.theme.colors.primary}
  align-self: flex-end;
  justify-content: center; 
  align-items: center;
  bottom: 24px;
  right: 24px;
  height: 56px;
  width: 56px;
  border-radius: 40px; 
`;

const HoverAddButton = (props: TouchableOpacityProps) => (
  <AddItemTouchableOpacity {...props}>
    <Text>+</Text>
  </AddItemTouchableOpacity>
);

export default HoverAddButton;

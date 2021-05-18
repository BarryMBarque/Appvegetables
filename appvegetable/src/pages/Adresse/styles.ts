import styled from 'styled-components/native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {Platform} from 'react-native';
export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;
export const Title = styled.Text`
  margin: 64px 0 24px;
  font-size: 24px;
  color: #021010;
  font-family: 'RobotoSlab-Medium';
`;

export const BackToSignInButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  border-width: 1px;
  border-color: #f9f5f4;
  padding: 16px 0 ${16 + getBottomSpace()}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
export const BackToSignInText = styled.Text`
  color: #102010;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;
export const HeaderContainer = styled.View`
  justify-content: space-between;
  width: 100%;
  height: 50px;
  border-bottom-width: 1px;
  flex-direction: row;
`;
export const ArrowContainer = styled.TouchableOpacity`
  align-self: flex-start;
  align-items: center;
  width: 50px;
  padding-top: 8px;
  height: 50px;
`;

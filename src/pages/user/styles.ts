import styled from 'styled-components/native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {Platform} from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px 30px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  margin: 24px 0 24px;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 20px;
  background-color: #228b22;
  height: 130px;
  width: 130px;
  border-radius: 130px;
  align-self: center;
`;

export const UserAvatar = styled.Image`
  height: 186px;
  width: 186px;
  border-radius: 98px;
  align-self: center;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 10px;
`;
export const Checkbutton = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  background: #228b22;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
`;
export const TextButton = styled.Text`
  color: #fff;
  font-size: 18px;
`;
export const HeaderText = styled.Text`
  font-size: 20px;
  color: #202020;
  margin-top: 10px;
`;
export const HeaderContainer = styled.View`
  justify-content: space-between;
  width: 100%;
  height: 50px;
  flex: 1;
  margin-top: 5px;
  border-bottom-width: 2px;
  border-color: rgba(1, 125, 2, 0.5);
  flex-direction: row;
`;

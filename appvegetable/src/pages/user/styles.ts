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
`;

export const UserAvatar = styled.Image`
  height: 186px;
  width: 186px;
  border-radius: 98px;
  align-self: center;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 40px;
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

import styled from 'styled-components/native';

import {getBottomSpace} from 'react-native-iphone-x-helper';
import {Platform} from 'react-native';
export const Container = styled.View`
  align-items: stretch;
  flex: 1;

  justify-content: space-between;
`;
export const AdressContainer = styled.View`
  max-width: 500px;
  height: 125px;
  margin-left: 5px;
  justify-content: center;
  align-self: center;
`;
export const StateCityText = styled.Text`
  align-self: flex-start;
  margin-bottom: 10px;
  margin-left: 18px;
  color: #616161;
  background-color: #fff;
  font-size: 18px;
`;
export const RoadText = styled.Text`
  align-self: flex-start;
  margin-bottom: 10px;
  margin-left: 18px;
  color: #616161;
  background-color: #fff;
  font-size: 18px;
`;
export const ComplementText = styled.Text`
  align-self: flex-start;
  margin-bottom: 10px;
  margin-left: 18px;
  color: #616161;
  background-color: #fff;
  font-size: 18px;
`;
export const HeaderChoice = styled.TouchableOpacity`
  align-content: center;
  flex-direction: row;
  padding-top: 2px;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.5);
  width: 100%;

  margin-top: 4px;
  border-radius: 10px;
  background-color: #fff;
  border-width: 3px;

  border-color: rgba(22, 125, 22, 0.8);
`;
export const AdressBox = styled.View`
  flex-direction: row;
`;

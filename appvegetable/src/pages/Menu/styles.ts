import styled from 'styled-components/native';

import {getBottomSpace} from 'react-native-iphone-x-helper';
import {Platform} from 'react-native';
export const Container = styled.View`
  align-items: stretch;
  flex: 1;
  background-color: #fff;

  justify-content: space-between;
`;
export const SearchContainer = styled.View`
  width: 90%;

  height: 70px;
`;
export const HeaderContainer = styled.View`
  align-items: center;

  justify-content: space-between;
  flex-direction: row;

  height: 80px;
  border: 1px solid;
  border-color: #cfcfcf;
`;
export const AvatarContent = styled.TouchableOpacity`
  height: 50px;
  width: 50px;

  margin-top: 10px;
  margin-left: 10px;
  border-radius: 100px;
  align-self: center;
`;
export const AvatarImg = styled.Image`
  height: 50px;
  width: 50px;

  margin-top: 10px;
  margin-left: 10px;
  border-radius: 100px;
  align-self: center;
`;
export const AvartarTextContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;
export const AvatarText = styled.Text`
  color: #021000;
  font-size: 16px;
  margin-right: 110px;
  align-self: flex-start;
  justify-content: space-between;
`;
export const AvatarTextDescription = styled.Text`
  color: #305030;
  font-size: 16px;
  margin-top: 2px;
  margin-right: 50px;
  align-self: center;
  justify-content: space-between;
`;
export const Texte = styled.View`
  height: 75px;
  align-items: center;

  margin-top: 10px;
  margin-left: 8px;
`;
export const AvatarContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: 75px;
`;
export const ItemContainer = styled.View`
  height: 100px;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  border-top-width: 1px;
  border-color: #cfcfcf;

  background-color: #fff;
`;
export const Item = styled.TouchableOpacity``;
export const ItemImage = styled.Image`
  height: 50px;
  width: 50px;
  margin-top: 10px;
  /* border-radius: 5px;
  border: 1px solid;
  border-color: #cfcfcf;  */
`;
export const ItemName = styled.Text`
  color: #021000;
  font-weight: 300;
  font-size: 16px;
  align-self: center;
`;
export const OfferContainer = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #228b22;
`;
export const Offer = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 18px;
  margin-left: 5px;
  align-self: center;
  align-self: flex-start;
`;

export const ItensContainer = styled.View`
  flex-direction: row;
  height: 300px;
  justify-content: space-between;
  border-top-width: 1px;
  border-color: #cfcfcf;
  margin-top: 0px;
`;

export const Product1Container = styled.TouchableOpacity`
  height: 300px;

  padding: 2px;
  margin-top: 1px;
  border-bottom-width: 1px;
  border-color: #cfcfcf;
  background-color: #fff;
`;

export const ProductImage = styled.Image`
  height: 180px;
  width: 100%;
  align-self: center;
`;
export const ProductDescription = styled.View``;
export const ProductName = styled.Text`
  color: #021000;
  font-size: 19px;
  margin-top: 10px;
  margin-right: 110px;
  align-self: flex-start;
  justify-content: space-between;
`;

export const ProductPrice = styled.Text`
  color: #202020;
  font-size: 18px;
  margin-top: 2px;
  margin-right: 50px;
  align-self: flex-start;
`;

export const PromotionContainer = styled.View`
  flex-direction: row;
  height: 50px;
  flex: 1;
  justify-content: space-between;

  padding-top: 5px;
`;
export const PromoPercentContainer = styled.TouchableOpacity`
  align-items: center;
  margin-top: 5px;
  margin-right: 10px;
  height: 30px;
  width: 40px;
  background-color: #ff4040;
`;
export const PromoAddContainer = styled.TouchableOpacity`
  align-items: center;
  margin-top: 5px;
  height: 30px;
  width: 30px;
  margin-right: 2px;
  background-color: #228b22;
`;
export const PromoPriceContainer = styled.View`
  align-items: center;
  margin-top: 5px;
  height: 30px;
  margin-right: 5px;
`;

export const PromoPercentual = styled.Text`
  color: #fff;
  font-size: 18px;

  align-self: center;
`;

export const PromoAdd = styled.Text`
  color: #fff;
  font-size: 18px;

  align-self: center;
`;
export const PromoPrice = styled.Text`
  color: #021000;
  font-weight: 700;
  font-size: 22px;
`;

export const MenuContainer = styled.View`
  height: 100px;
  margin-top: 56px;
  flex-direction: row;
  padding-bottom: 25px;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
`;
export const MenuItem = styled.TouchableOpacity`
  align-self: center;
`;
export const MenuItemText = styled.Text`
  font-size: 15px;
  color: #010210;
  align-self: center;
`;

export const Title = styled.Text`
  margin: 64px 0 24px;
  font-size: 24px;
  color: #010210;
  font-family: 'RobotoSlab-Medium';
`;
export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  color: #010210;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;
export const CreateAcountButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  border-width: 1px;
  border-color: #f9f8f9;
  padding: 16px 0 ${16 + getBottomSpace()}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
export const CreateAcountText = styled.Text`
  color: #228b22;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;
export const ScrolFruit = styled.View`
  flex: 1;
  width: 100%;
  background-color: #f00;
`;
export const ScrolVegatable = styled.View`
  flex: 1;
  width: 100%;
  background-color: #0f0;
`;
export const ScrolOeuf = styled.View`
  flex: 1;
  width: 100%;
  background-color: #00f;
`;

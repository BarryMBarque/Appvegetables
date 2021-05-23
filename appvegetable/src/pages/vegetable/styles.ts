import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  flex: 1;
`;

export const HeaderContainer = styled.View`
  align-self: center;
  width: 100%;
  height: 50px;
  justify-content: space-between;
  border-width: 2px;
  border-color: #228b22;
  flex-direction: row;
`;
export const ArrowContainer = styled.TouchableOpacity`
  align-self: flex-start;
  align-items: center;
  width: 50px;
  padding-top: 8px;
  height: 50px;
`;
export const FruityTexte = styled.Text`
  align-self: center;
  color: #021000;
  padding-right: 5px;
  font-weight: 700;
  font-size: 22px;
`;
export const PromotionFruity = styled.View``;

export const FruityContainer = styled.Image`
  width: 100%;
  height: 80%;
  align-self: center;
  margin-left: 4px;
`;
export const FruityPin = styled.View`
  width: 125px;
  height: 160px;
  margin-left: 5px;
  align-self: center;
`;
export const FruityDescriptionContainer = styled.View`
  width: 250px;
  height: 125px;
  margin-left: 5px;

  align-self: center;
`;
export const FruityPriceContainer = styled.View`
  width: 120px;
  height: 40px;
  padding-top: 3px;
  margin-top: 25px;
  margin-left: 20px;

  flex-direction: row;
  justify-content: space-between;
`;
export const FruityDescriptionText = styled.Text`
  align-self: flex-start;

  margin-left: 18px;
  color: #021000;
  background-color: #fff;
  font-size: 20px;
`;
export const PromoPrice = styled.Text`
  color: #228b22;

  font-weight: 700;
  font-size: 22px;
`;
export const FruityPrice = styled.Text`
  color: #5f5f4f;

  margin-top: 8px;
  margin-right: 18px;
  text-decoration: line-through;
  font-weight: 700;
  font-size: 14px;
`;
export const FruityWeight = styled.Text`
  align-self: flex-start;
  margin-top: 15px;
  margin-left: 20px;
  color: #5f5f4f;
  font-weight: 400;
  font-size: 14px;
`;
export const PromoPercentContainer = styled.TouchableOpacity`
  align-items: center;
  align-self: flex-start;
  margin-top: 2px;
  height: 25px;
  width: 25px;
  background-color: #e1d201;
`;
export const PromoPercentual = styled.Text`
  color: #fff;
  font-size: 12px;

  align-self: center;
`;
export const HeaderChoice = styled.TouchableOpacity`
  align-content: center;
  flex-direction: row;
  padding-top: 2px;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.5);
  width: 100%;

  margin-top: 4px;
  border-radius: 10px;
  background-color: #fbfdf7;
  border-width: 3px;

  border-color: rgba(22, 125, 22, 0.2);
`;
export const HeaderChoiceText = styled.Text`
  align-self: center;
  margin-left: 20px;
  color: #021000;
  font-weight: 400;
  font-size: 20px;
`;

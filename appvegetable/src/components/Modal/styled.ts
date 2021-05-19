import styled from 'styled-components/native';

export const IndicatorContainer = styled.View`
  width: 50px;
  height: 5px;
  background-color: #ccc;
  border-radius: 50px;
  align-self: center;
  margin-top: 5px;
`;
export const ButtonContainer = styled.View`
  width: 100%;
  height: 65px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 60px;
`;
export const ButtonUpdate = styled.TouchableOpacity`
  width: 30%;
  height: 40px;
  border-radius: 10px;
  background-color: #228b22;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;
export const ButtonRemove = styled.TouchableOpacity`
  width: 30%;
  height: 40px;
  border-radius: 10px;
  background-color: #f90d45;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;
export const TextButton = styled.Text`
  font-size: 18px;

  font-weight: 500;
  color: #fff;
`;
export const Container = styled.View`
  align-items: center;
  flex: 1;
`;

export const HeaderContainer = styled.View`
  align-self: center;
  width: 100%;
  height: 50px;
  justify-content: space-between;

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
  height: 100%;
  align-self: center;
  margin-left: 4px;
`;
export const FruityPin = styled.View`
  width: 90px;
  height: 80px;
  margin-left: 5px;
  align-self: center;
`;
export const QuantityContainer = styled.View`
  width: 70px;
  height: 100px;
  margin-right: 5px;
  align-self: center;
  justify-content: center;
  align-items: center;
`;
export const Quantity = styled.View`
  width: 40px;
  height: 30px;
  align-self: center;
  background-color: #228b22;
  align-items: center;
  border-radius: 5px;
`;
export const QuantityAdd = styled.TouchableOpacity`
  width: 40px;
  height: 30px;
  align-self: center;

  align-items: center;
`;
export const QuantityButtonText = styled.Text`
  font-weight: 800;
  font-size: 20px;
  color: #021000;
`;
export const QuantityText = styled.Text`
  font-weight: 800;
  font-size: 20px;
  color: #fff;
`;
export const QuantityRemove = styled.TouchableOpacity`
  width: 40px;
  height: 30px;
  align-self: center;
  align-items: center;
`;

export const FruityDescriptionContainer = styled.View`
  width: 160px;
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
export const FruityDescriptionCartContainer = styled.View`
  width: 120px;
  height: 40px;
  padding-top: 3px;

  flex-direction: row;
  justify-content: space-between;
`;
export const FruityDescriptionText = styled.Text`
  align-self: flex-start;

  margin-left: 8px;
  color: #021000;
  background-color: #fff;
  font-size: 20px;
`;
export const PromoPrice = styled.Text`
  color: #228b22;

  font-weight: 700;
  font-size: 15px;
`;
export const Promototal = styled.Text`
  font-weight: 400;
  font-size: 12px;
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
export const HeaderChoice = styled.View`
  align-content: center;
  flex-direction: row;
  padding-top: 2px;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.5);
  width: 100%;

  margin-top: 4px;
  border-radius: 10px;
  background-color: #fbfdf7;
  border-width: 3px;

  border-color: rgba(22, 125, 22, 0.5);
`;
export const TotalPriceChoice = styled.View`
  align-content: center;

  padding-top: 2px;

  width: 100%;

  margin-top: 4px;
  border-radius: 10px;
  background-color: #fbfdf7;
`;
export const TotalChoice = styled.View`
  align-content: center;
  flex-direction: row;
  padding-top: 2px;

  width: 100%;
  justify-content: space-between;
  margin-top: 4px;

  background-color: #fbfdf7;
`;
export const HeaderChoiceText = styled.Text`
  align-self: center;
  margin-left: 20px;
  color: #021000;
  font-weight: 400;
  font-size: 20px;
`;

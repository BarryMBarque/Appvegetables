import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  flex: 1;
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
export const FruityContainer = styled.View`
  flex: 1;
  align-items: center;
`;
export const FruityImage = styled.Image`
  height: 150px;
  width: 150px;
`;
export const FruityPriceContainer = styled.View`
  height: 90px;

  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
  border-bottom-width: 3px;

  border-color: rgba(50, 50, 22, 0.2);
`;
export const FruityNameContainer = styled.View`
  width: 200px;
`;
export const FruityName = styled.Text`
  color: #021000;
  margin-left: 5px;
  font-weight: 700;
  font-size: 22px;
`;
export const PromoPercentContainer = styled.TouchableOpacity`
  align-items: center;
  margin-top: 5px;
  margin-right: 10px;
  height: 30px;
  width: 40px;
  background-color: #e1d201;
`;
export const PriceContainer = styled.View`
  height: 50px;
  margin-left: 5px;
  flex-direction: row;
`;
export const DescriptionContainer = styled.View`
  height: 50px;

  margin-top: 40px;

  box-shadow: 0px 3px 3px rgba(125, 125, 125, 0.3);
`;
export const CartContainer = styled.View`
  height: 200px;

  margin-left: 10px;
  margin-right: 10px;

  justify-content: space-between;
  margin-top: 40px;
  border-top-width: 2px;
  border-color: rgba(120, 110, 130, 0.5);
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-right-width: 2px;
  border-left-width: 2px;
  box-shadow: 0 3px 3px rgba(120, 110, 130, 0.5);
  padding-bottom: 6px;
`;
export const TotalContainer = styled.View`
  height: 50px;

  flex-direction: row;
  justify-content: space-between;
`;
export const TotalText = styled.Text`
  color: #021000;
  margin-left: 5px;
  font-weight: 700;
  font-size: 22px;
  align-self: center;
`;
export const NumberContainer = styled.View`
  height: 50px;
  width: 30%;

  flex-direction: row;
  justify-content: space-around;
`;
export const ControlContainer = styled.TouchableOpacity`
  padding-top: 2px;
  align-self: center;
  width: 30px;
  height: 30px;
  border: 2px;
  border-radius: 10px;
  border-color: rgba(10, 200, 40, 0.5);
  background-color: #fff;
`;

export const ControlText = styled.Text`
  align-self: center;
  font-size: 15px;
  color: #000;
`;
export const TotalControle = styled.Text`
  align-self: center;
  font-size: 14px;
  color: #000;
`;
export const PromoPrice = styled.Text`
  color: #228b22;
  font-weight: 700;
  font-size: 16px;

  align-self: center;
`;
export const FruityPrice = styled.Text`
  color: #ccc;
  font-size: 16px;
  margin-left: 10px;
  text-decoration: line-through;

  align-self: center;
`;
export const PromoPercentual = styled.Text`
  color: #fff;
  font-size: 16px;

  align-self: center;
`;

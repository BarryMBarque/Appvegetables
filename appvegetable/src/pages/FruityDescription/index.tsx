import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import ImgAnanas from '../../assets/ananas.jpg';

import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {
  ArrowContainer,
  HeaderContainer,
  FruityContainer,
  FruityPriceContainer,
  FruityImage,
  FruityNameContainer,
  FruityName,
  PromoPercentContainer,
  PromoPercentual,
  PromoPrice,
  FruityPrice,
  PriceContainer,
  DescriptionContainer,
  CartContainer,
  TotalContainer,
  TotalText,
  NumberContainer,
  ControlContainer,
  ControlText,
  TotalControle,
  FruityTexte,
} from './styles';
import {Container} from './styles';
import {StackScreenProps} from '@react-navigation/stack';
import Button from '../../components/Button';
import api from '../../services/api';
import {useAuth} from '../../hooks/Auth';
import {useCart} from '../../hooks/Cart';
import {useNavigation} from '@react-navigation/native';

interface Props {
  navigation: any;
  route: {
    params: {
      id: string;
      picture_url: any;
      name: any;
      distcount_coupon: any;
      price: any;
      discount_price: number;
      description: any;
    };
  };
}
const FruityDescription: React.FC<Props> = ({navigation, route}) => {
  //:const navigation = useNavigation();
  const [totalprice, setTotalPrice] = useState(Number);
  const [weight, setWeight] = useState(1);
  const [loading, setloading] = useState(false);
  const {user} = useAuth();
  const {goBack} = useNavigation();
  const {AddCart, getCart, loadingCart} = useCart();

  const handletotalprice = useCallback(
    (weight: number) => {
      const a = weight * route.params.discount_price;
      const b = a.toFixed(2);
      const total = parseFloat(b);
      setTotalPrice(total);
    },
    [setTotalPrice],
  );

  const handleSubscribeCart = useCallback(
    async (weight: number) => {
      try {
        setloading(true);
        const product_id = route.params.id;
        const val_unit = route.params.discount_price;
        const user_id = user.id;
        const quantity = weight;
        AddCart({user_id, product_id, quantity, val_unit}).then(() =>
          setloading(false),
        );

        Alert.alert('Sucesso!', 'Produto adicionado ao carinho!');
      } catch {
        Alert.alert(
          'Error ao adicionar carinho',
          'Ocorreu um erro ao adiconar ao carinho!',
        );
      }
    },
    [AddCart, setloading],
  );

  const handleAddproduct = useCallback(() => {
    setWeight(weight + 1);
  }, [setWeight, weight]);
  const handleRemoveproduct = useCallback(() => {
    if (weight > 1) {
      setWeight(weight - 1);
    }
  }, [setWeight, weight]);
  useEffect(() => {
    setWeight(weight);
    handletotalprice(weight);
  }, [weight]);

  return (
    <>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#228b22" />
        </View>
      ) : (
        <KeyboardAvoidingView
          style={{flex: 1}}
          enabled
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <SafeAreaView style={{flex: 1}}>
            <Container>
              <HeaderContainer>
                <ArrowContainer onPress={() => goBack()}>
                  <Icon name="chevron-left" size={30} color="#228B22" />
                </ArrowContainer>
                <FruityTexte>Produto</FruityTexte>
              </HeaderContainer>
              <ScrollView>
                <FruityContainer>
                  <FruityImage source={{uri: route.params.picture_url}} />
                  <FruityPriceContainer>
                    <FruityNameContainer>
                      <FruityName>{route.params.name}</FruityName>
                      <PriceContainer>
                        <PromoPrice>
                          ${route.params.discount_price}/kg
                        </PromoPrice>
                        <FruityPrice>${route.params.price}/kg</FruityPrice>
                      </PriceContainer>
                    </FruityNameContainer>
                    <PromoPercentContainer>
                      <PromoPercentual>
                        {route.params.distcount_coupon}%
                      </PromoPercentual>
                    </PromoPercentContainer>
                  </FruityPriceContainer>
                </FruityContainer>
                <DescriptionContainer>
                  <FruityName>{route.params.description}</FruityName>
                </DescriptionContainer>
                <CartContainer>
                  <TotalContainer>
                    <TotalText>Total ${totalprice}</TotalText>
                    <NumberContainer>
                      <ControlContainer onPress={handleRemoveproduct}>
                        <ControlText>-</ControlText>
                      </ControlContainer>
                      <TotalControle>{weight}</TotalControle>
                      <ControlContainer onPress={handleAddproduct}>
                        <ControlText>+</ControlText>
                      </ControlContainer>
                    </NumberContainer>
                  </TotalContainer>
                  <Button onPress={() => handleSubscribeCart(weight)}>
                    Adicionar ao carinho
                  </Button>
                </CartContainer>
              </ScrollView>
            </Container>
          </SafeAreaView>
        </KeyboardAvoidingView>
      )}
    </>
  );
};
export default FruityDescription;

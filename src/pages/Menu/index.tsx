import React, {useCallback, useEffect, useRef, useState} from 'react';

import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
  Text,
} from 'react-native';
import {v4} from 'uuid';
import Icon from 'react-native-vector-icons/Feather';
import Icone from 'react-native-vector-icons/MaterialCommunityIcons';
import Img from '../../assets/pp.jpg';
import ImgFruits from '../../assets/fruits.jpg';
import ImgLegumes from '../../assets/legumes.png';
import ImgOeuf from '../../assets/oeuf.jpg';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  HeaderContainer,
  SearchContainer,
  ItemContainer,
  AvatarContent,
  AvatarImg,
  AvatarTextDescription,
  AvatarContainer,
  ItensContainer,
  MenuContainer,
  Product1Container,
  Title,
  AvatarText,
  Texte,
  Item,
  ItemImage,
  ProductImage,
  ProductDescription,
  ProductName,
  ProductPrice,
  PromotionContainer,
  PromoPercentContainer,
  PromoPercentual,
  PromoPrice,
  PromoAddContainer,
  PromoAdd,
  PromoPriceContainer,
  ItemName,
  Offer,
  OfferContainer,
  MenuItem,
  MenuItemText,
  AvartarTextContainer,
} from './styles';

import Input from '../../components/SearchInput';
import api from '../../services/api';
import {FlatList} from 'react-native-gesture-handler';
import {useAuth} from '../../hooks/Auth';
import {useProduct} from '../../hooks/Product';
import {Avatar} from 'react-native-elements';
import {useAdress} from '../../hooks/Adress';
import {useCart} from '../../hooks/Cart';
import {useOrder} from '../../hooks/Order';
interface Iproducts {
  id: string;
  name: string;
  picture: string;
  quantity: number;
  description: string;
  price: number;
  discount_coupon?: number;
  final_price: number;
  categoryProduct_id: string;
  cart_id?: string;
  picture_url: string;
}
interface MenuData {
  searchWord: string;
}

const Menu: React.FC = ({navigation, route}: any) => {
  const formRef = useRef<FormHandles>(null);
  const [products, setProducts] = useState<Iproducts[]>([]);
  const {user, loading} = useAuth();
  const {getAdress} = useAdress();
  const {getCart} = useCart();
  const {getOrder} = useOrder();
  const {product, loadingProduct} = useProduct();

  const handleSearch = useCallback(async (data: MenuData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        searchWord: Yup.string(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }
      Alert.alert(
        'Error na authentificação',
        'Ocorreu um erro ao fazer login, cheque as credenciais!',
      );
    }
  }, []);
  useEffect(() => {
    getAdress();
    getCart();
    getOrder();
  }, []);

  return (
    <>
      {loadingProduct ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#228b22" />
        </View>
      ) : product.length !== 0 ? (
        <KeyboardAvoidingView
          style={{flex: 1}}
          enabled
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Container>
            <HeaderContainer>
              <SearchContainer>
                <Form ref={formRef} onSubmit={handleSearch}>
                  <Input
                    name="searchWord"
                    icon="search"
                    placeholder="Fruitas, legumes, etc.."
                    returnKeyType="send"
                    onSubmitEditing={() => {
                      formRef.current?.submitForm();
                    }}
                  />
                </Form>
              </SearchContainer>
              <Icon name="bell" size={30} color="#228B22" />
            </HeaderContainer>
            <AvatarContainer>
              <AvatarContent onPress={() => navigation.navigate('User')}>
                {user.avatar_url ? (
                  <Avatar
                    size="medium"
                    rounded
                    source={{uri: user.avatar_url}}
                    activeOpacity={0.7}
                    containerStyle={{backgroundColor: '#228B22'}}
                  />
                ) : (
                  <Avatar
                    size="medium"
                    rounded
                    icon={{name: 'user', type: 'font-awesome'}}
                    activeOpacity={0.7}
                    containerStyle={{backgroundColor: '#228B22'}}
                  />
                )}
              </AvatarContent>
              <Texte>
                <AvatarText>Bem-vindo {user.name}</AvatarText>
                <AvartarTextContainer>
                  <AvatarTextDescription>
                    O melhor momento para escolher suas fruitas e legumes
                  </AvatarTextDescription>
                </AvartarTextContainer>
              </Texte>
            </AvatarContainer>
            <ItemContainer>
              <Item onPress={() => navigation.navigate('Fruity')}>
                <ItemImage source={ImgFruits} />
                <ItemName>Fruitas</ItemName>
              </Item>
              <Item onPress={() => navigation.navigate('Vegetable')}>
                <ItemImage source={ImgLegumes} />
                <ItemName>Legumes</ItemName>
              </Item>
            </ItemContainer>
            <OfferContainer>
              <Offer>Promoção do dia</Offer>
            </OfferContainer>
            <FlatList
              data={product}
              keyExtractor={(item, index) => item.id}
              renderItem={item => (
                <ItensContainer>
                  <Product1Container
                    onPress={() =>
                      navigation.navigate('FruityDescription', {
                        id: item.item.id,
                        picture_url: item.item.picture_url,
                        name: item.item.name,
                        distcount_coupon: item.item.discount_coupon,
                        price: item.item.price,
                        discount_price: item.item.final_price,
                        description: item.item.description,
                      })
                    }>
                    <ProductImage source={{uri: item.item.picture_url}} />
                    <ProductDescription>
                      <ProductName>{item.item.name}</ProductName>
                      <ProductPrice>${item.item.price}/kg</ProductPrice>
                    </ProductDescription>
                    <PromotionContainer>
                      <PromoPercentContainer>
                        <PromoPercentual>
                          {item.item.discount_coupon}%
                        </PromoPercentual>
                      </PromoPercentContainer>
                      <PromoPriceContainer>
                        <PromoPrice>${item.item.final_price}</PromoPrice>
                      </PromoPriceContainer>
                      <PromoAddContainer
                        onPress={() =>
                          navigation.navigate('FruityDescription', {
                            id: item.item.id,
                            picture_url: item.item.picture_url,
                            name: item.item.name,
                            distcount_coupon: item.item.discount_coupon,
                            price: item.item.price,
                            discount_price: item.item.final_price,
                            description: item.item.description,
                          })
                        }>
                        <PromoAdd>+</PromoAdd>
                      </PromoAddContainer>
                    </PromotionContainer>
                  </Product1Container>
                </ItensContainer>
              )}
            />
            {/* </ScrollView> */}
          </Container>
        </KeyboardAvoidingView>
      ) : (
        <KeyboardAvoidingView
          style={{flex: 1}}
          enabled
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Container>
            <HeaderContainer>
              <SearchContainer>
                <Form ref={formRef} onSubmit={handleSearch}>
                  <Input
                    name="searchWord"
                    icon="search"
                    placeholder="Fruitas, legumes, etc.."
                    returnKeyType="send"
                    onSubmitEditing={() => {
                      formRef.current?.submitForm();
                    }}
                  />
                </Form>
              </SearchContainer>
              <Icon name="bell" size={30} color="#228B22" />
            </HeaderContainer>
            <AvatarContainer>
              <AvatarContent>
                {user.avatar_url ? (
                  <Avatar
                    size="medium"
                    rounded
                    source={{uri: user.avatar_url}}
                    activeOpacity={0.7}
                    containerStyle={{backgroundColor: '#228B22'}}
                  />
                ) : (
                  <Avatar
                    size="medium"
                    rounded
                    icon={{name: 'user', type: 'font-awesome'}}
                    activeOpacity={0.7}
                    containerStyle={{backgroundColor: '#228B22'}}
                  />
                )}
              </AvatarContent>
              <Texte>
                <AvatarText>Bem-vindo {user.name}</AvatarText>
                <AvartarTextContainer>
                  <AvatarTextDescription>
                    O melhor momento para escolher suas fruitas e legumes
                  </AvatarTextDescription>
                </AvartarTextContainer>
              </Texte>
            </AvatarContainer>
            <ItemContainer>
              <Item onPress={() => navigation.navigate('Fruity')}>
                <ItemImage source={ImgFruits} />
                <ItemName>Fruitas</ItemName>
              </Item>
              <Item>
                <ItemImage source={ImgLegumes} />
                <ItemName>Legumes</ItemName>
              </Item>
              <Item>
                <ItemImage source={ImgOeuf} />
                <ItemName>Ovo</ItemName>
              </Item>
            </ItemContainer>
            <OfferContainer>
              <Offer>Promoção do dia</Offer>
            </OfferContainer>
          </Container>
          <Text>Não há produto disponível</Text>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

export default Menu;

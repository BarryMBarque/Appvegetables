import React, {useCallback, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Icone from 'react-native-vector-icons/MaterialIcons';

import {
  ArrowContainer,
  HeaderChoice,
  HeaderContainer,
  FruityTexte,
  FruityContainer,
  FruityDescriptionContainer,
  FruityDescriptionText,
  FruityWeight,
  FruityPriceContainer,
  PromoPrice,
  FruityPin,
  FruityDescriptionCartContainer,
  Promototal,
  TotalPriceChoice,
  TotalChoice,
  Checkbutton,
} from './styles';
import {Container} from './styles';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {useProduct} from '../../hooks/Product';
import {useCart} from '../../hooks/Cart';
import {useAuth} from '../../hooks/Auth';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import Modal from '../../components/Modal';
import {TextButton} from '../../components/Modal/styled';

interface Cart {
  id?: string;
  user_id?: string;
  product_id?: string;
  name?: string;
  description?: string;
  picture_url?: string;
  quantity?: number;
  val_unit?: number;
  total_price?: number;
  createdAt?: Date;
}
const Cart: React.FC = ({navigation, show}: any) => {
  const {Cart, loadingCart, getCart, total} = useCart();
  const [cartsDescription, setCartDescription] = useState<Cart>();

  const {goBack} = useNavigation();
  const [modal, setModal] = useState(false);
  const {navigate} = useNavigation();

  const handleShowModal = useCallback(
    (
      picture_url,
      quantity,
      total_price,
      name,
      val_unit,
      id,
      user_id,
      product_id,
      description,
    ) => {
      setCartDescription({
        picture_url,
        quantity,
        total_price,
        name,
        val_unit,
        id,
        user_id,
        description,
        product_id,
      });
      setModal(true);
      console.log(modal);
    },
    [setModal, modal],
  );

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      {loadingCart ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#228b22" />
        </View>
      ) : Cart.length !== 0 ? (
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

                <FruityTexte>Carinho</FruityTexte>
              </HeaderContainer>
              <FlatList
                data={Cart.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))}
                keyExtractor={(item, index) => item.id}
                //enabled={true}
                renderItem={item => (
                  <HeaderChoice
                    onPress={() =>
                      handleShowModal(
                        item.item.picture_url,
                        item.item.quantity,
                        item.item.total_price,
                        item.item.name,
                        item.item.val_unit,
                        item.item.id,
                        item.item.user_id,
                        item.item.product_id,
                        item.item.description,
                      )
                    }>
                    <FruityPin>
                      <FruityContainer source={{uri: item.item.picture_url}} />
                    </FruityPin>

                    <FruityDescriptionContainer>
                      <FruityDescriptionText>
                        {item.item.name}
                      </FruityDescriptionText>
                      <FruityDescriptionCartContainer>
                        <FruityWeight>${item.item.val_unit}</FruityWeight>
                        <FruityWeight>x {item.item.quantity}</FruityWeight>
                      </FruityDescriptionCartContainer>
                      <FruityPriceContainer>
                        <Promototal>Total</Promototal>
                        <PromoPrice>${item.item.total_price}</PromoPrice>
                      </FruityPriceContainer>
                    </FruityDescriptionContainer>
                  </HeaderChoice>
                )}
              />

              <TotalPriceChoice>
                <TotalChoice>
                  <Promototal>Subtotal</Promototal>
                  <PromoPrice>${total}</PromoPrice>
                </TotalChoice>

                <PromoPrice>
                  --------------------------------------------
                </PromoPrice>
                <TotalChoice>
                  <Promototal>Total</Promototal>
                  <PromoPrice>${total}</PromoPrice>
                </TotalChoice>
              </TotalPriceChoice>
              <Checkbutton onPress={() => navigate('Checkout')}>
                <TextButton>Finalizar pedido</TextButton>
              </Checkbutton>

              {/* </ScrollView> */}
            </Container>

            <Modal
              show={modal}
              picture_url={cartsDescription?.picture_url}
              quantity={cartsDescription?.quantity}
              total_price={cartsDescription?.total_price}
              name={cartsDescription?.name}
              val_unit={cartsDescription?.val_unit}
              id={cartsDescription?.id}
              user_id={cartsDescription?.user_id}
              product_id={cartsDescription?.product_id}
              description={cartsDescription?.description}
              close={() => setModal(false)}
            />
          </SafeAreaView>
        </KeyboardAvoidingView>
      ) : (
        <KeyboardAvoidingView
          style={{flex: 1}}
          enabled
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <SafeAreaView style={{flex: 1}}>
            <Container>
              <HeaderContainer>
                <ArrowContainer onPress={() => goBack()}>
                  <Icon name="arrow-left" size={30} color="#228B22" />
                </ArrowContainer>

                <FruityTexte>Carinho</FruityTexte>
              </HeaderContainer>

              <Icone name="remove-shopping-cart" size={300} color="#228B22" />
            </Container>
          </SafeAreaView>
        </KeyboardAvoidingView>
      )}
    </>
  );
};
export default Cart;

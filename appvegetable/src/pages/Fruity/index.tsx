import React, {useCallback, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import ImgAnanas from '../../assets/ananas.jpg';
import ImgAvocat from '../../assets/avocat.jpg';
import ImgFraise from '../../assets/fraise.jpg';
import ImgKiwi from '../../assets/kiwi.png';
import ImgMangue from '../../assets/mangue.jpg';
import ImgOrange from '../../assets/orange.jpg';
import ImgRaisin from '../../assets/raisin.jpg';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';

import {
  ArrowContainer,
  HeaderChoice,
  HeaderContainer,
  FruityTexte,
  FruityContainer,
  HeaderChoiceText,
  FruityDescriptionContainer,
  FruityDescriptionText,
  FruityWeight,
  FruityPriceContainer,
  PromoPrice,
  FruityPrice,
  FruityPin,
  PromoPercentContainer,
  PromoPercentual,
} from './styles';
import {Container} from './styles';
import {useNavigation} from '@react-navigation/native';
import {useProduct} from '../../hooks/Product';

const Fruity: React.FC = ({navigation}: any) => {
  const {product, loadingProduct} = useProduct();
  const {goBack} = useNavigation();

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
          <SafeAreaView style={{flex: 1}}>
            <Container>
              <HeaderContainer>
                <ArrowContainer onPress={() => goBack()}>
                  <Icon name="arrow-left" size={30} color="#228B22" />
                </ArrowContainer>
                <FruityTexte>Fruitas</FruityTexte>
              </HeaderContainer>

              {/* <ScrollView> */}
              <FlatList
                data={product}
                keyExtractor={(item, index) => item.id}
                renderItem={item => (
                  <HeaderChoice
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
                    <FruityPin>
                      <PromoPercentContainer>
                        <PromoPercentual>
                          {item.item.discount_coupon}%
                        </PromoPercentual>
                      </PromoPercentContainer>
                      <FruityContainer source={{uri: item.item.picture_url}} />
                    </FruityPin>

                    <FruityDescriptionContainer>
                      <FruityDescriptionText>
                        {item.item.name}
                      </FruityDescriptionText>
                      <FruityWeight>1kg</FruityWeight>
                      <FruityPriceContainer>
                        <PromoPrice>${item.item.final_price}</PromoPrice>
                        <FruityPrice>${item.item.price}</FruityPrice>
                      </FruityPriceContainer>
                    </FruityDescriptionContainer>
                  </HeaderChoice>
                )}
              />
              {/* </ScrollView> */}
            </Container>
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
                <FruityTexte>Fruitas</FruityTexte>
              </HeaderContainer>
              <Text>Não há produto disponivel</Text>
            </Container>
          </SafeAreaView>
        </KeyboardAvoidingView>
      )}
    </>
  );
};
export default Fruity;

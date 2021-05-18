import React, {cloneElement, useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useCart} from '../../../hooks/Cart';
import api from '../../../services/api';
import {
  ButtonContainer,
  ButtonRemove,
  ButtonUpdate,
  FruityContainer,
  FruityDescriptionCartContainer,
  FruityDescriptionContainer,
  FruityDescriptionText,
  FruityPin,
  FruityPriceContainer,
  FruityWeight,
  HeaderChoice,
  IndicatorContainer,
  PromoPrice,
  Promototal,
  Quantity,
  QuantityAdd,
  QuantityButtonText,
  QuantityContainer,
  QuantityRemove,
  QuantityText,
  TextButton,
} from './styled';

interface Adress {
  show: boolean;

  id?: string;
  state?: string;
  city?: string;
  cep?: number;
  district?: string;
  road?: string;
  number?: number;
  complement?: string;

  close?: () => void;
}

const {height} = Dimensions.get('window');
const Modal: React.FC<Adress> = ({
  show,
  id,
  state,
  city,
  cep,
  district,
  road,
  number,
  complement,
  close,
}: any) => {
  const [statee, setState] = useState({
    opacity: new Animated.Value(0),
    container: new Animated.Value(height),
    modal: new Animated.Value(height),
  });
  const [price, setPrice] = useState(Number);
  const [qte, setQte] = useState(Number);
  const [loading, setloading] = useState(false);
  const {getCart, deleteCart} = useCart();

  const openModal = () => {
    Animated.sequence([
      Animated.timing(statee.container, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(statee.opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(statee.modal, {
        toValue: 0,
        bounciness: 5,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.sequence([
      Animated.timing(statee.modal, {
        toValue: height,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(statee.opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(statee.container, {
        toValue: height,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };
  // useEffect(() => {
  //   setPrice(total_price);
  //   setQte(quantity);
  // }, []);
  useEffect(() => {
    console.log(show);
    if (show) {
      openModal();
    } else {
      closeModal();
    }
  }, [show]);

  const handleRemove = useCallback(
    async id => {
      // setloading(true);
      deleteCart(id).then(() => {
        // setloading(false);

        close;
      });
    },
    [closeModal, setloading],
  );
  const handleCheckout = useCallback(
    async (state, city, cep, district, road, number, complement) => {
      await api.post('/orders', {
        state,
        city,
        cep,
        district,
        road,
        number,
        complement,
      });
    },
    [],
  );
  // useEffect(() => {
  //   getCart();
  // }, [handleRemove, handleUpdate]);
  return loading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#228b22" />
    </View>
  ) : (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: statee.opacity,
          transform: [{translateY: statee.container}],
        },
      ]}>
      <Animated.View
        style={[
          styles.modal,
          {
            transform: [{translateY: statee.modal}],
          },
        ]}>
        <IndicatorContainer />

        {/* <HeaderChoice>
          <FruityPin>
            <FruityContainer source={{uri: picture_url}} />
          </FruityPin>

          <FruityDescriptionContainer>
            <FruityDescriptionText>{name}</FruityDescriptionText>

            <FruityPriceContainer>
              <PromoPrice>${price}</PromoPrice>
            </FruityPriceContainer>
          </FruityDescriptionContainer>
          <QuantityContainer>
            <QuantityAdd>
              <QuantityButtonText>+</QuantityButtonText>
            </QuantityAdd>
            <Quantity>
              <QuantityText>{qte}</QuantityText>
            </Quantity>
            <QuantityRemove>
              <QuantityButtonText>-</QuantityButtonText>
            </QuantityRemove>
          </QuantityContainer>
        </HeaderChoice> */}
        <ButtonContainer>
          <ButtonRemove onPress={() => handleRemove(id)}>
            <TextButton>Remover</TextButton>
          </ButtonRemove>
          <ButtonUpdate
            onPress={() =>
              handleCheckout(
                state,
                city,
                cep,
                district,
                road,
                number,
                complement,
              )
            }>
            <TextButton>Checkout</TextButton>
          </ButtonUpdate>
          <ButtonUpdate onPress={close}>
            <TextButton>Cancelar</TextButton>
          </ButtonUpdate>
        </ButtonContainer>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
  },
  modal: {
    bottom: 0,
    position: 'absolute',
    height: '50%',
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 25,
    paddingRight: 25,
  },
  indicator: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 5,
  },
  text: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
  },
  btn: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#228b22',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
});
export default Modal;

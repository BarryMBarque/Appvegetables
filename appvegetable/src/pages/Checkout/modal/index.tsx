import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import React, {cloneElement, useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAdress} from '../../../hooks/Adress';
import {useCart} from '../../../hooks/Cart';
import {useOrder} from '../../../hooks/Order';
import api from '../../../services/api';
import {
  ButtonCancel,
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

  const [loading, setloading] = useState(false);
  const {deleteAdress} = useAdress();
  const {getOrder} = useOrder();
  const {getCart, updatedOrder} = useCart();

  const openModal = useCallback(() => {
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
  }, []);

  const closeModal = useCallback(() => {
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
  }, []);

  useEffect(() => {
    if (show) {
      openModal();
    } else {
      closeModal();
    }
  }, [show]);

  const handleRemove = useCallback(
    async id => {
      setloading(true);
      try {
        deleteAdress(id).then(() => {
          setloading(false);
          Alert.alert('Sucesso!, O endereço foi removido');
        });

        close();
      } catch {
        setloading(false);

        Alert.alert('Erro!, Erro ao remover o endereço tente novamente!');
        close();
      }
    },
    [closeModal, setloading, deleteAdress, close],
  );
  const handleCheckout = useCallback(
    async (state, city, cep, district, road, number, complement) => {
      setloading(true);
      try {
        await api.post('/orders', {
          state,
          city,
          cep,
          district,
          road,
          number,
          complement,
        });
        setloading(false);
        getOrder();
        updatedOrder();
        getCart().then(() => {
          close();
        });

        Alert.alert('Sucesso!, O pedido foi registrado com sucesso!');
      } catch {
        setloading(false);
        close();
        Alert.alert(
          'Erro!, Erro ao registrar o pedido, produto indisponivel, tente novamente!',
        );
      }
    },
    [setloading, getCart, getOrder, close],
  );

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
          <ButtonCancel onPress={close}>
            <TextButton>Cancelar</TextButton>
          </ButtonCancel>
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

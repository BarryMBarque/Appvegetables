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
import {useCart} from '../../hooks/Cart';
import api from '../../services/api';
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

interface Cart {
  show: boolean;
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
  close?: () => void;
}

const {height} = Dimensions.get('window');
const Modal: React.FC<Cart> = ({
  show,
  picture_url,
  quantity,
  total_price,
  name,
  val_unit,
  id,
  user_id,
  product_id,
  description,
  close,
}: any) => {
  const [state, setState] = useState({
    opacity: new Animated.Value(0),
    container: new Animated.Value(height),
    modal: new Animated.Value(height),
  });
  const [price, setPrice] = useState(Number);
  const [showModal, setShowModal] = useState(false);
  const [loading, setloading] = useState(false);
  const {getCart, deleteCart, updateItemCart} = useCart();
  const [weight, setWeight] = useState(quantity);

  const handletotalprice = useCallback(() => {
    const a = parseFloat(weight) * parseFloat(val_unit);
    const b = a.toFixed(2);
    const total = parseFloat(b);

    setPrice(total);
  }, [setPrice, weight, val_unit]);

  const handleAddproduct = useCallback(() => {
    setWeight(parseInt(weight) + 1);
  }, [setWeight, weight, handletotalprice]);

  const handleRemoveproduct = useCallback(() => {
    if (parseInt(weight) > 1) {
      setWeight(parseInt(weight) - 1);
    }
  }, [setWeight, weight, handletotalprice]);

  useEffect(() => {
    handletotalprice();
  }, [handleRemoveproduct, handleAddproduct]);
  const openModal = useCallback(() => {
    Animated.sequence([
      Animated.timing(state.container, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(state.opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(state.modal, {
        toValue: 0,
        bounciness: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const closeModal = useCallback(() => {
    Animated.sequence([
      Animated.timing(state.modal, {
        toValue: height,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(state.opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(state.container, {
        toValue: height,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  useEffect(() => {
    setPrice(total_price);
    setWeight(quantity);
    setShowModal(show);
  }, []);
  useEffect(() => {
    if (show) {
      openModal();
    } else {
      closeModal();
    }
    setPrice(total_price);
    setWeight(quantity);
  }, [show]);

  const handleRemove = useCallback(
    async id => {
      setloading(true);
      try {
        deleteCart(id).then(() => {
          setloading(false);
          close();
        });

        Alert.alert('Sucesso!', 'O carinho foi removido!');
      } catch {
        setloading(false);
        close();
        Alert.alert(
          'Erro!',
          'Erro ao remover o o item do carinho tente novamente!',
        );
      }
    },
    [closeModal, setloading, loading],
  );
  const handleUpdate = useCallback(
    async (id, quantity, total_price) => {
      setloading(true);
      try {
        updateItemCart({id, quantity, total_price}).then(() => {
          setloading(false);
          close();
        });
        Alert.alert('Sucesso!', 'Carinho atualizado!');
      } catch {
        setloading(false);
        close();
        Alert.alert('Erro!', 'Erro à atualizar o carinho tente novamente!');
      }
    },
    [closeModal],
  );
  useEffect(() => {
    getCart();
  }, [handleRemove, handleUpdate]);
  return loading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#228b22" />
    </View>
  ) : (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: state.opacity,
          transform: [{translateY: state.container}],
        },
      ]}>
      <Animated.View
        style={[
          styles.modal,
          {
            transform: [{translateY: state.modal}],
          },
        ]}>
        <IndicatorContainer />

        <HeaderChoice>
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
            <QuantityAdd onPress={handleAddproduct}>
              <QuantityButtonText>+</QuantityButtonText>
            </QuantityAdd>
            <Quantity>
              <QuantityText>{weight}</QuantityText>
            </Quantity>
            <QuantityRemove onPress={handleRemoveproduct}>
              <QuantityButtonText>-</QuantityButtonText>
            </QuantityRemove>
          </QuantityContainer>
        </HeaderChoice>
        <ButtonContainer>
          <ButtonRemove onPress={() => handleRemove(id)}>
            <TextButton>Remover</TextButton>
          </ButtonRemove>
          <ButtonUpdate onPress={() => handleUpdate(id, weight, price)}>
            <TextButton>Atualizar</TextButton>
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

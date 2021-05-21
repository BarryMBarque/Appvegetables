import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import {Icon} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import Button from '../../components/Button';
import {useAdress} from '../../hooks/Adress';
import {useAuth} from '../../hooks/Auth';
import Adress from '../Adresse';
import Modal from './modal/index';
import {ArrowContainer, FruityTexte, HeaderContainer} from '../Fruity/styles';
import {
  AdressContainer,
  ComplementText,
  Container,
  RoadText,
  StateCityText,
  HeaderChoice,
  AdressBox,
} from './styles';

interface IAdress {
  id: string;
  state: string;
  city: string;
  CEP: number;
  district: string;
  road: string;
  number: number;
  complement: string;
}

const Checkout: React.FC = () => {
  const [modal, setModal] = useState(false);
  const {navigate} = useNavigation();
  const [adresses, setAdresses] = useState<IAdress>();
  const {user} = useAuth();
  const {getAdress, adress, loadingAdress} = useAdress();
  const {goBack} = useNavigation();
  const handleSuscribeOrder = useCallback(
    (id, state, city, CEP, district, road, number, complement) => {
      try {
        setAdresses({
          id,
          state,
          city,
          CEP,
          district,
          road,
          number,
          complement,
        });
        setModal(true);
      } catch {
        Alert.alert('Erro, erro ao efetuar o checkout!');
      }
    },
    [],
  );

  useEffect(() => {
    getAdress();
  }, []);
  return (
    <>
      {loadingAdress ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#228b22" />
        </View>
      ) : adress.length !== 0 ? (
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
                <FruityTexte>Checkout</FruityTexte>
              </HeaderContainer>

              {/* <ScrollView> */}

              <FlatList
                data={adress}
                keyExtractor={(item, index) => item.id}
                renderItem={item => (
                  <HeaderChoice
                    onPress={() =>
                      handleSuscribeOrder(
                        item.item.id,
                        item.item.state,
                        item.item.city,
                        item.item.CEP,
                        item.item.district,
                        item.item.road,
                        item.item.number,
                        item.item.complement,
                      )
                    }>
                    <AdressBox>
                      <ArrowContainer onPress={() => goBack()}>
                        <Icon name="home" size={30} color="#228B22" />
                      </ArrowContainer>
                      <AdressContainer>
                        <RoadText>
                          {item.item.road},{item.item.number},{' '}
                          {item.item.district}
                        </RoadText>

                        <StateCityText>
                          {item.item.city}-{item.item.state}-{item.item.CEP}
                        </StateCityText>

                        <ComplementText>{item.item.complement}</ComplementText>

                        {/* <FruityWeight></FruityWeight>
                  <FruityPriceContainer>
                    <PromoPrice>$</PromoPrice>
                    <FruityPrice>$</FruityPrice>
                  </FruityPriceContainer> */}
                      </AdressContainer>
                    </AdressBox>
                  </HeaderChoice>
                )}
              />
              {/* </ScrollView> */}

              <Button onPress={() => navigate('Adress')}>
                Adicionar Endereço
              </Button>
            </Container>

            <Modal
              show={modal}
              id={adresses?.id}
              state={adresses?.state}
              city={adresses?.city}
              cep={adresses?.CEP}
              district={adresses?.district}
              road={adresses?.road}
              number={adresses?.number}
              complement={adresses?.complement}
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
                <FruityTexte>Checkout</FruityTexte>
              </HeaderContainer>
              <Button onPress={() => navigate('Adress')}>
                Adicionar Endereço
              </Button>
            </Container>
          </SafeAreaView>
        </KeyboardAvoidingView>
      )}
    </>
  );
};
export default Checkout;

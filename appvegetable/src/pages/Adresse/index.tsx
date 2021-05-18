/* eslint-disable @typescript-eslint/ban-types */
import React, {useCallback, useRef, useState} from 'react';
import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import Input from '../../components/Input';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../../components/Button';
//import logoImg from '../../assets/logo.png';
import {Form} from '@unform/mobile';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import {
  Container,
  Title,
  BackToSignInButton,
  BackToSignInText,
  HeaderContainer,
  ArrowContainer,
} from './styles';
import {useNavigation} from '@react-navigation/native';
import {FormHandles} from '@unform/core';
import api from '../../services/api';
import {FruityTexte} from '../Fruity/styles';
import {useAdress} from '../../hooks/Adress';

interface AdressFormData {
  id: string;
  state: string;
  city: string;
  cep: number;
  district: string;
  road: string;
  number: number;
  complement: string;
}
const Adress: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const stateInputRef = useRef<TextInput>(null);
  const cityInputRef = useRef<TextInput>(null);

  const cepInputRef = useRef<TextInput>(null);
  const districtInputRef = useRef<TextInput>(null);
  const roadInputRef = useRef<TextInput>(null);
  const numberInputRef = useRef<TextInput>(null);
  const complementInputRef = useRef<TextInput>(null);

  const {goBack} = useNavigation();
  const {getAdress, adress} = useAdress();

  const handleSignUp = useCallback(async (data: AdressFormData) => {
    try {
      // formRef.current?.setErrors({});
      // const schema = Yup.object().shape({
      //   name: Yup.string().required('Nome obrigatório'),
      //   email: Yup.string()
      //     .required('E-mail obrigatório')
      //     .email('Digite um e-mail válido'),
      //   password: Yup.string().min(6, 'No minimo 6 dígitos'),
      // });

      // await schema.validate(data, {
      //   abortEarly: false,
      // });

      console.log(data);
      const adresse = await api.post('/adresses', {
        state: data.state,
        city: data.city,
        cep: data.cep,
        district: data.district,
        road: data.road,
        number: data.number,
        complement: data.complement,
      });
      console.log(adresse);
      const adress_id = adresse.data.id as string;
      //const user = await api.patch('/users/adress', {adress_id});
      getAdress();

      // history.push('/');
      // Alert.alert(
      //   'Cadastro realizado',
      //   'você já pode fazer seu logon no App Vegetable',
      // );
      // navigation.navigate('SignIn');

      // addToast({
      //   type: 'success',
      //   title: 'Cadastro realizado',
      //   description: 'você já pode fazer seu logon no GoBarber',
      // });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
      Alert.alert(
        'Erro no  cadastro',
        'Ocorreu um erro ao fazer o cadastro, tente novamente!',
      );
      return;
      //addToast({
      //  type: 'error',
      //  title: 'Erro no  cadastro',
      //  description: 'Ocorreu um erro ao fazer o cadastro, tente novamente!',
      // });
    }
  }, []);
  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView>
          <HeaderContainer>
            <ArrowContainer onPress={() => goBack()}>
              <Icon name="arrow-left" size={30} color="#228B22" />
            </ArrowContainer>
            <FruityTexte>Fruitas</FruityTexte>
          </HeaderContainer>
          <Container>
            <View>
              <Title>Cadastrar Endereço</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                name="state"
                icon="user"
                placeholder="Estado"
                returnKeyType="next"
                onSubmitEditing={() => {
                  stateInputRef.current?.focus();
                }}
              />
              <Input
                autoCapitalize="words"
                name="city"
                icon="user"
                placeholder="Cdade"
                returnKeyType="next"
                onSubmitEditing={() => {
                  cityInputRef.current?.focus();
                }}
              />
              <Input
                ref={cepInputRef}
                keyboardType="number-pad"
                autoCorrect={false}
                autoCapitalize="none"
                name="cep"
                icon="user"
                placeholder="CEP"
                returnKeyType="next"
                onSubmitEditing={() => {
                  cepInputRef.current?.focus();
                }}
              />
              <Input
                ref={districtInputRef}
                autoCapitalize="words"
                name="district"
                icon="user"
                placeholder="Bairro"
                returnKeyType="next"
                onSubmitEditing={() => {
                  districtInputRef.current?.focus();
                }}
              />
              <Input
                ref={roadInputRef}
                autoCapitalize="words"
                name="road"
                icon="user"
                placeholder="Rua"
                returnKeyType="next"
                onSubmitEditing={() => {
                  roadInputRef.current?.focus();
                }}
              />

              <Input
                ref={numberInputRef}
                keyboardType="number-pad"
                autoCorrect={false}
                autoCapitalize="none"
                name="number"
                icon="user"
                placeholder="Numero da rua"
                returnKeyType="next"
                onSubmitEditing={() => {
                  numberInputRef.current?.focus();
                }}
              />
              <Input
                ref={complementInputRef}
                autoCapitalize="words"
                name="complement"
                icon="user"
                placeholder="complemento"
                returnKeyType="next"
                onSubmitEditing={() => {
                  complementInputRef.current?.focus();
                }}
              />
            </Form>
            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}>
              Cadastrar
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      {/* <BackToSignInButton onPress={() => navigation.navigate('SignIn')}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInText>Cadastrar</BackToSignInText>
      </BackToSignInButton> */}
    </>
  );
};

export default Adress;

/* eslint-disable @typescript-eslint/ban-types */
import React, {useCallback, useRef} from 'react';
import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Input from '../../components/Input';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../../components/Button';
//import logoImg from '../../assets/logo.png';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAcountButton,
  CreateAcountText,
} from './styles';

import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../hooks/Auth';
import {PriceContainer} from '../FruityDescription/styles';
import api from '../../services/api';
import {useProduct} from '../../hooks/Product';

interface SignInFormData {
  email: string;
}

const SendPasswordRecovery: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const handleSignIn = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/password/forgot', data);

      navigation.navigate('ResetPassword');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }
      Alert.alert(
        'Error na Recuperação de senha',
        'Ocorreu um erro ao fazer a recuperação de senha!',
      );
    }
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1}}>
          <Container>
            <View>
              <Title>Recuperação de Senha</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
            </Form>
            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}>
              Enviar
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreateAcountButton onPress={() => navigation.navigate('SignIn')}>
        <Icon name="log-in" size={20} color="#228B22" />
        <CreateAcountText>Voltar para SignIn</CreateAcountText>
      </CreateAcountButton>
    </>
  );
};

export default SendPasswordRecovery;

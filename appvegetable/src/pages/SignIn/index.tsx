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
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const {signIn, user, loading} = useAuth();
  const {getProduct} = useProduct();
  const handleSignIn = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      console.log(data);
      const usuario = await signIn({
        email: data.email,
        password: data.password,
      });

      await api.post('/sessions', data);
      await getProduct();
      navigation.navigate('Menu');
      console.log('OK');
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
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{flex: 1}}>
            <Container>
              <View>
                <Title>Faça teu Sign-In</Title>
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
                <Input
                  ref={passwordInputRef}
                  secureTextEntry
                  name="password"
                  icon="lock"
                  placeholder="Senha"
                  returnKeyType="send"
                  onSubmitEditing={() => {
                    formRef.current?.submitForm();
                  }}
                />
              </Form>
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}>
                Entrar
              </Button>

              <ForgotPassword
                onPress={() => {
                  navigation.navigate('SendPassword');
                }}>
                <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
              </ForgotPassword>
            </Container>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
      <CreateAcountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#228B22" />
        <CreateAcountText>Criar uma conta</CreateAcountText>
      </CreateAcountButton>
    </>
  );
};

export default SignIn;

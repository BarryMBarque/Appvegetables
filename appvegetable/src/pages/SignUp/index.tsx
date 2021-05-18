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
} from 'react-native';
import Input from '../../components/Input';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../../components/Button';
//import logoImg from '../../assets/logo.png';
import {Form} from '@unform/mobile';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import {Container, Title, BackToSignInButton, BackToSignInText} from './styles';
import {useNavigation} from '@react-navigation/native';
import {FormHandles} from '@unform/core';
import api from '../../services/api';
interface SignUpFormData {
  name: string;
  cpf: number;
  phoneNumber: string;
  email: string;
  password: string;
}
const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const cpfInputRef = useRef<TextInput>(null);
  const phoneNumberInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const handleSignUp = useCallback(async (data: SignUpFormData) => {
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
      await api.post('/users', {
        name: data.name,
        cpf: data.cpf,
        phoneNumber: data.phoneNumber,
        email: data.email,
        password: data.password,
      });
      // console.log(res);
      // history.push('/');
      Alert.alert(
        'Cadastro realizado',
        'você já pode fazer seu logon no App Vegetable',
      );
      navigation.navigate('SignIn');

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
          <Container>
            <View>
              <Title>Creer um compte</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={cpfInputRef}
                keyboardType="number-pad"
                autoCorrect={false}
                autoCapitalize="none"
                name="cpf"
                icon="user"
                placeholder="CPF"
                returnKeyType="next"
                onSubmitEditing={() => {
                  cpfInputRef.current?.focus();
                }}
              />
              <Input
                ref={phoneNumberInputRef}
                keyboardType="name-phone-pad"
                autoCorrect={false}
                autoCapitalize="none"
                name="phoneNumber"
                icon="user"
                placeholder="Telephone"
                returnKeyType="next"
                onSubmitEditing={() => {
                  phoneNumberInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="user"
                placeholder="Email"
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
                placeholder="Mot de passe"
                textContentType="newPassword"
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
              Entrer
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <BackToSignInButton onPress={() => navigation.navigate('SignIn')}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInText>Sign-In</BackToSignInText>
      </BackToSignInButton>
    </>
  );
};

export default SignUp;

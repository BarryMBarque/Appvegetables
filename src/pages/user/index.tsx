/* eslint-disable indent */
import React, {useRef, useCallback} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FormHandles} from '@unform/core';
import {Form} from '@unform/mobile';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import {
  Container,
  Title,
  UserAvatarButton,
  UserAvatar,
  BackButton,
  Checkbutton,
  TextButton,
  HeaderContainer,
  HeaderText,
} from './styles';
import {useAuth} from '../../hooks/Auth';
import Icon from 'react-native-vector-icons/Feather';

interface ProfileFormData {
  name: string;
  cpf: number;
  phoneNumber: string;
  email: string;
  oldPassword: string;
  password: string;
  passwordConfirmation: string;
}
interface User {
  token: string;
  user: {
    id: string;
    cpf: number;
    phoneNumber: string;
    name: string;
    email: string;
    avatar_url: string;
  };
}

const User: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const cpfInputRef = useRef<TextInput>(null);
  const phoneNumberInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);
  const {user, updateUser, signOut} = useAuth();

  const handleChange = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});
        //lê-se: o schema recebe um objeto com o seguinte formato
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          cpf: Yup.number().required('Cpf obrigatorio'),
          phoneNumber: Yup.string(),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um email válido'),
          oldPassword: Yup.string(),
          password: Yup.string().when('oldPassword', {
            is: (val: string) => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          passwordConfirmation: Yup.string()
            .when('password', {
              is: (val: string) => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta'),
        });

        const {
          cpf,
          email,
          name,
          oldPassword,
          password,
          phoneNumber,
          passwordConfirmation,
        } = data;

        const formaData = {
          name,
          cpf,
          phoneNumber,
          email,
          ...(oldPassword
            ? {
                old_password: oldPassword,
                password,
                password_confirmation: passwordConfirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', data);
        await updateUser(response.data);

        Alert.alert('Alteração realizada com sucesso');
        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        } else {
          Alert.alert(`Erro ao atualizar perfil,${err}`);
        }
      }
    },
    [navigation, updateUser],
  );

  const handleUpdateAvatar = useCallback(() => {
    launchCamera({mediaType: 'photo'}, (response: ImagePickerResponse) => {
      try {
        if (response.didCancel) {
          return;
        }

        if (response.errorCode || response.errorMessage) {
          Alert.alert('Erro ao atualizar seu avatar');
        }

        const data = new FormData();
        console.log(response.uri);

        data.append('avatar', {
          type: 'image/jpeg',
          uri: response.uri,
          name: `${user.id}.jpg`,
        });

        api
          .patch('users/avatar', data)
          .then(apiResponse => updateUser(apiResponse.data));

        Alert.alert('Sucesso, Avatar Atualizado com sucesso!');
      } catch {
        Alert.alert('Erro ao atualizar avatar');
      }
    });
  }, [updateUser, user.id, launchCamera]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleLogOut = useCallback(() => {
    signOut();
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1}}
      enabled>
      <ScrollView keyboardShouldPersistTaps="handled">
        <HeaderContainer>
          <BackButton onPress={handleGoBack}>
            <Icon name="chevron-left" size={24} color="#228b22" />
          </BackButton>
          <HeaderText>Configuração</HeaderText>
          <BackButton onPress={handleLogOut}>
            <Icon name="power" size={24} color="#228b22" />
          </BackButton>
        </HeaderContainer>
        <Container>
          <UserAvatarButton onPress={handleUpdateAvatar}>
            {user.avatar_url ? (
              <UserAvatar source={{uri: user.avatar_url}} />
            ) : (
              <>
                <Icon
                  name="user"
                  size={120}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    color: '#fff',
                  }}
                />
                <Icon
                  name="camera"
                  size={24}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    color: '#228b22',
                    backgroundColor: '#fff',
                  }}
                />
              </>
            )}
          </UserAvatarButton>

          {/* Essa View serve pq o Text não funciona a animação do KeyboardAvoidingView */}
          <View>
            <Title>Crie sua conta</Title>
          </View>

          <Form ref={formRef} onSubmit={handleChange} initialData={{...user}}>
            <Input
              name="name"
              icon="user"
              placeholder="Nome"
              returnKeyType="next"
              onSubmitEditing={() => cpfInputRef.current?.focus()}
            />
            <Input
              ref={cpfInputRef}
              keyboardType="number-pad"
              autoCorrect={false}
              autoCapitalize="none"
              name="cpf"
              icon="paperclip"
              placeholder="CPF"
              returnKeyType="next"
              onSubmitEditing={() => {
                phoneNumberInputRef.current?.focus();
              }}
            />
            <Input
              ref={phoneNumberInputRef}
              keyboardType="name-phone-pad"
              autoCorrect={false}
              autoCapitalize="none"
              name="phoneNumber"
              icon="phone"
              placeholder="Telefone"
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
            />
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              name="email"
              icon="mail"
              placeholder="E-mail"
              returnKeyType="next"
              onSubmitEditing={() => {
                oldPasswordInputRef.current?.focus();
              }}
            />

            <Input
              secureTextEntry
              textContentType="password"
              name="oldPassword"
              icon="lock"
              placeholder="Senha atual"
              returnKeyType="next"
              ref={oldPasswordInputRef}
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />

            <Input
              secureTextEntry
              textContentType="newPassword"
              name="password"
              icon="lock"
              placeholder="Nova senha"
              returnKeyType="next"
              ref={passwordInputRef}
              onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
            />

            <Input
              secureTextEntry
              textContentType="newPassword"
              name="confirmPassword"
              icon="lock"
              placeholder="Confirmação de senha"
              returnKeyType="send"
              ref={confirmPasswordInputRef}
              onSubmitEditing={() => formRef.current?.submitForm()}
            />

            <Checkbutton
              onPress={() => {
                formRef.current?.submitForm();
              }}>
              <TextButton>Confirmar</TextButton>
            </Checkbutton>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default User;

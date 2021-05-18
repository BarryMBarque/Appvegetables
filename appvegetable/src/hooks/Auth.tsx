/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  adress_id:string;
}
interface AuthState {
  token: string;
  user: User;
}

interface SignInCredetials {
  email: string;
  password: string;
}
interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: SignInCredetials): Promise<void>;
  updateUser(user: User): Promise<void>;
  signOut(): void;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function LoadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@AppVegetable:token',
        '@AppVegetable:user',
      ]);


      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }
    LoadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {

    const response = await api.post('/sessions', {
      email,
      password,
    });
    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@AppVegtable:token', token],
      ['@AppVegetable:user', JSON.stringify(user)],
    ]);
    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, [setData]);


  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@AppVegetable:token', '@AppVegetable:user']);

    setData({} as AuthState);
  }, [setData]);
  const updateUser = useCallback(
    async (user: User) => {
      await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [data.token],
  );
  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
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
import { Alert } from 'react-native';

interface IAdress {
  id:string;
  state: string;
  city:string;
  CEP: number;
  district: string;
  road: string;
  number: number;
  complement: string;
}
interface AdressState {

  Adress: IAdress;
}


interface AdressContextData {
  adress: IAdress[];
  loadingAdress: boolean;

  getAdress(): Promise<void>;
  deleteAdress(id: string): Promise<void>;


}
const AdressContext = createContext<AdressContextData>({} as AdressContextData);

const AdressProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAdress[]>({} as IAdress[]);
  const [loadingAdress, setLoading] = useState(true);
  useEffect(() => {
    async function LoadStorageData(): Promise<void> {
      const Adress = await AsyncStorage.getItem(

        '@AppVegetable:adress',
      );

      if (Adress) {
        setData(JSON.parse(Adress));
      }

      setLoading(false);

    }
    LoadStorageData();
  }, []);

  const getAdress = useCallback(async () => {

    try{
      const response = await api.get('/findAdress');

      const  Adress = response.data;
      console.log(Adress);

      await AsyncStorage.setItem(

        '@AppVegetable:adress', JSON.stringify(Adress)
      );
      setData(Adress);
    }catch{
      Alert.alert('Erro, Erro ao carregar os endereços!')
    }


  }, [setData]);

  const deleteAdress = useCallback(async (
    id
  ) => {
    console.log(id);
    try{
      await api.post('/deleteAdress', {id})
      await AsyncStorage.removeItem('@AppVegetable:cart');
      setData([]);
      getAdress()
      ;
    }catch{
      Alert.alert('Erro', 'Não foi possível remover o produto!')
    }



  }, [getAdress, setData]);




  return (
    <AdressContext.Provider value={{adress: data,  loadingAdress, getAdress, deleteAdress}}>
      {children}
    </AdressContext.Provider>
  );
};

function useAdress(): AdressContextData {
  const context = useContext(AdressContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;

}

export {AdressProvider, useAdress };

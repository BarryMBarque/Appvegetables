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

interface IOrder {
  id: string;
  discount_coupon?: number;
  total_price: number;
  status: number;
  user_id: string;
  name: string;
  description: string;
  picture_url?: string;
  quantity:number;
  val_unit:number;
  state: string;
  city: string;
  CEP: number;
  district: string;
  road: string;
  number: number;
  complement?: string;
}
interface OrderState {

  Order: IOrder;
}


interface OrderContextData {
  Order: IOrder[];
  loadingOrder: boolean;

  getOrder(): Promise<void>;


}
const OrderContext = createContext<OrderContextData>({} as OrderContextData);

const OrderProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IOrder[]>({} as IOrder[]);
  const [loadingOrder, setLoading] = useState(true);
  useEffect(() => {
    async function LoadStorageData(): Promise<void> {
      const Order = await AsyncStorage.getItem(

        '@AppVegetable:order',
      );

      if (Order) {
        setData(JSON.parse(Order));
      }

      setLoading(false);

    }
    LoadStorageData();
  }, []);

  const getOrder = useCallback(async () => {
    try{
      const response = await api.get('/orders/getOrders');

      const  Order = response.data;
      console.log(Order);

      await AsyncStorage.setItem(

        '@AppVegetable:order', JSON.stringify(Order)
      );

      setData(Order);
    }catch{
      Alert.alert('Erro, Eroo ao carregar os endereços!')
    }


  }, []);




  return (
    <OrderContext.Provider value={{Order: data,  loadingOrder, getOrder}}>
      {children}
    </OrderContext.Provider>
  );
};

function useOrder(): OrderContextData {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export {OrderProvider, useOrder };

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
import { useAuth } from './Auth';

interface Cart {
  id: string;
  user_id: string;
  product_id: string;
  name: string;
  description: string;
  picture_url?: string;
  quantity:number;
  val_unit:number;
  total_price:number;
  createdAt: Date;
}
interface Cartdata {

  user_id: string;
  product_id: string;
  quantity:number;
  val_unit:number;

}
interface ItemCart {

 id: string;
 quantity:number;
 total_price:number;

}


interface CartContextData {
  Cart: Cart[];
  loadingCart: boolean;
  total: string;
  getCart(): Promise<void>;
  deleteCart(id: string): Promise<void>
  AddCart({
    product_id,
    quantity,
    val_unit,
  }: Cartdata): Promise<void>
updateItemCart({
  id,
  quantity,
  total_price,  }: ItemCart): Promise<void>
}
const CartContext = createContext<CartContextData>({} as CartContextData);

const CartProvider: React.FC = ({ children }) => {
  const {user}= useAuth()
  const [data, setData] = useState<Cart[]>({} as Cart[]);
  const [ total, Settotal ] = useState('');
  const [loadingCart, setLoading] = useState(true);

  useEffect(() => {
    async function LoadStorageData(): Promise<void> {
      const cart = await AsyncStorage.getItem(
        '@AppVegetable:cart',
      );

      if (cart) {
        setData(JSON.parse(cart));
      }
      setLoading(false);
    }
    LoadStorageData();
  }, []);
  const getCart = useCallback(async () => {
    const response = await api.get<Cart[]>('/getAllCarts');
    const  cart = response.data;


    await AsyncStorage.setItem(
      '@AppVegetable:cart', JSON.stringify(cart)
    );
    setData(cart);
    let total = '';
    let tot =0;
    cart.map((cart: Cart) => {
      if (cart.total_price) {
        if (cart.total_price) {
          const b = cart.total_price.toString();
          const c = parseFloat(b);
          const a = c.toFixed(2);

          tot = tot + parseFloat(a);
        }
      }
    });
    total = tot.toFixed(2);
    Settotal(total);
    setLoading(false);

  }, [setData]);


  const AddCart = useCallback(async ({
    product_id,
    quantity,
    val_unit,
  }) => {
    await api.post('/carts',{
      product_id,
      quantity,
      val_unit,
    });
    getCart();


  }, [getCart]);
  const updateItemCart = useCallback(async ({
    id,
    quantity,
    total_price,
  }) => {

    await api.patch('/updateCarts',{
      id,
      quantity,
      total_price,
    });
    getCart();


  }, [getCart]);
  const deleteCart = useCallback(async (
    id
  ) => {
    await api.post('/deleteCarts', {id})
    await AsyncStorage.removeItem('@AppVegetable:cart');
    setData([]);
    getCart();


  }, []);

  useEffect(()=>{

    setLoading(true);

  },[AddCart, deleteCart])
  return (
    <CartContext.Provider value={{Cart: data, loadingCart, total ,getCart,AddCart, deleteCart, updateItemCart}}>
      {children}
    </CartContext.Provider>
  );
};

function useCart(): CartContextData {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export { CartProvider, useCart };

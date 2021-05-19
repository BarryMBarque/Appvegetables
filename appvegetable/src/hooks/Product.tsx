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

interface Product {
  id: string;
  name: string;
  picture: string;
  quantity: number;
  description: string;
  price: number;
  discount_coupon?: number;
  final_price: number;
  categoryProduct_id: string;
  cart_id?: string;
  picture_url: string;
}
interface ProductState {

  Product: Product[];
}


interface ProductContextData {
  product: Product[];
  loadingProduct: boolean;
  CartProduct: Product;
  getProduct(): Promise<void>;
  findById(product_id: string): Promise<void>;

}
const ProductContext = createContext<ProductContextData>({} as ProductContextData);

const ProductProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<Product[]>({} as Product[]);
  const [dataCart, setDataCart] = useState<Product>({} as Product);
  const [loadingProduct, setLoading] = useState(true);
  useEffect(() => {
    async function LoadStorageData(): Promise<void> {
      const product = await AsyncStorage.getItem(

        '@AppVegetable:product',
      );
      const productCart = await AsyncStorage.getItem(

        '@AppVegetable:productCart',
      );

      if (product) {
        setData(JSON.parse(product));
      }

      setLoading(false);
      if(productCart){
        setDataCart(JSON.parse(productCart))
      }
    }
    LoadStorageData();
  }, []);

  const getProduct = useCallback(async () => {

    try{
      const response = await api.get('/getAllProducts');

      const  product = response.data;

      await AsyncStorage.setItem(

        '@AppVegetable:product', JSON.stringify(product)
      );
      setData(product);
    }catch{
      Alert.alert('Erro, Erro ao carregar os produtos')
    }
  }, []);
  const findById = useCallback(async (product_id) => {

    const response = await api.post('/products/findByid',{product_id});

    const  product = response.data;

    await AsyncStorage.setItem(

      '@AppVegetable:productCart', JSON.stringify(product)
    );
    setDataCart(product);



  }, []);



  return (
    <ProductContext.Provider value={{product: data, CartProduct: dataCart, loadingProduct, getProduct, findById}}>
      {children}
    </ProductContext.Provider>
  );
};

function useProduct(): ProductContextData {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export { ProductProvider, useProduct };

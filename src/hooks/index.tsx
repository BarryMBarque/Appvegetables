import React from 'react';
import {AdressProvider} from './Adress';
import {AuthProvider} from './Auth';
import {CartProvider} from './Cart';
import {OrderProvider} from './Order';
import {ProductProvider} from './Product';

const AppProvider: React.FC = ({children}) => (
  <AuthProvider>
    <CartProvider>
      <ProductProvider>
        <AdressProvider>
          <OrderProvider>{children}</OrderProvider>
        </AdressProvider>
      </ProductProvider>
    </CartProvider>
  </AuthProvider>
);
export default AppProvider;

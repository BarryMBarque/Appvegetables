import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import CartPrincipal from '../pages/cart';

import FruityDescription from '../pages/FruityDescription';
import Checkout from '../pages/Checkout';
import Adress from '../pages/Adresse';
import Vegetable from '../pages/vegetable';
import UserConfiguration from '../pages/user';
const Cart = createStackNavigator();

const CartRoutes: React.FC = () => (
  <Cart.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {backgroundColor: '#fff'},
    }}>
    <Cart.Screen name="Cart" component={CartPrincipal} />
    <Cart.Screen name="User" component={UserConfiguration} />
    <Cart.Screen name="FruityDescription" component={FruityDescription} />
    <Cart.Screen name="Checkout" component={Checkout} />
    <Cart.Screen name="Adress" component={Adress} />
    <Cart.Screen name="Vegetable" component={Vegetable} />
  </Cart.Navigator>
);
export default CartRoutes;

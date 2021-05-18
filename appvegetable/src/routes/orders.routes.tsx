import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import MenuPrincipal from '../pages/Menu';
import Fruity from '../pages/Fruity';
import FruityDescription from '../pages/FruityDescription';
import Checkout from '../pages/Checkout';
import Adress from '../pages/Adresse';
import UserConfiguration from '../pages/user';
const Orders = createStackNavigator();

const OrdersRoutes: React.FC = () => (
  <Orders.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {backgroundColor: '#fff'},
    }}>
    <Orders.Screen name="Menu" component={MenuPrincipal} />
    <Orders.Screen name="User" component={UserConfiguration} />
    <Orders.Screen name="Fruity" component={Fruity} />
    <Orders.Screen name="Checkout" component={Checkout} />
    <Orders.Screen name="Adress" component={Adress} />
    <Orders.Screen name="FruityDescription" component={FruityDescription} />
  </Orders.Navigator>
);
export default OrdersRoutes;

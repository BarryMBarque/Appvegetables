import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import MenuPrincipal from '../pages/Menu';
import Fruity from '../pages/Fruity';
import FruityDescription from '../pages/FruityDescription';
import Checkout from '../pages/Checkout';
import Adress from '../pages/Adresse';
import UserConfiguration from '../pages/user';
const Menu = createStackNavigator();

const MenuRoutes: React.FC = () => (
  <Menu.Navigator
    initialRouteName="Menu"
    screenOptions={{
      headerShown: false,
      cardStyle: {backgroundColor: '#fff'},
    }}>
    <Menu.Screen name="Menu" component={MenuPrincipal} />
    <Menu.Screen name="User" component={UserConfiguration} />
    <Menu.Screen name="Fruity" component={Fruity} />
    <Menu.Screen name="Checkout" component={Checkout} />
    <Menu.Screen name="Adress" component={Adress} />
    <Menu.Screen name="FruityDescription" component={FruityDescription} />
  </Menu.Navigator>
);
export default MenuRoutes;

import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import MenuPrincipal from '../pages/Menu';
import Fruity from '../pages/Fruity';
import FruityDescription from '../pages/FruityDescription';
import Checkout from '../pages/Checkout';
import Adress from '../pages/Adresse';
import UserConfiguration from '../pages/user';
const User = createStackNavigator();

const UserRoutes: React.FC = () => (
  <User.Navigator
    initialRouteName="User"
    screenOptions={{
      headerShown: false,
      cardStyle: {backgroundColor: '#fff'},
    }}>
    <User.Screen name="Menu" component={MenuPrincipal} />
    <User.Screen name="User" component={UserConfiguration} />
    <User.Screen name="Fruity" component={Fruity} />
    <User.Screen name="Checkout" component={Checkout} />
    <User.Screen name="Adress" component={Adress} />
    <User.Screen name="FruityDescription" component={FruityDescription} />
  </User.Navigator>
);
export default UserRoutes;

import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Menu from '../pages/Menu';
import Fruity from '../pages/Fruity';
import FruityDescription from '../pages/FruityDescription';
import Checkout from '../pages/Checkout';
import Adress from '../pages/Adresse';
import UserConfiguration from '../pages/user';
import Vegetable from '../pages/vegetable';
const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {backgroundColor: '#fff'},
    }}>
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
    <Auth.Screen name="Fruity" component={Fruity} />
    <Auth.Screen name="Vegetable" component={Vegetable} />
    <Auth.Screen name="User" component={UserConfiguration} />
    <Auth.Screen name="Menu" component={Menu} />
    <Auth.Screen name="FruityDescription" component={FruityDescription} />
    <Auth.Screen name="Checkout" component={Checkout} />
    <Auth.Screen name="Adress" component={Adress} />
  </Auth.Navigator>
);

export default AuthRoutes;

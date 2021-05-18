import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Menu from '../pages/Menu';
import Fruity from '../pages/Fruity';
import FruityDescription from '../pages/FruityDescription';
import Checkout from '../pages/Checkout';
import Adress from '../pages/Adresse';
const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {backgroundColor: '#fff'},
    }}>
    <App.Screen name="Fruity" component={Fruity} />
    <App.Screen name="FruityDescription" component={FruityDescription} />
    <App.Screen name="Checkout" component={Checkout} />
    <App.Screen name="Adress" component={Adress} />
  </App.Navigator>
);

export default AppRoutes;

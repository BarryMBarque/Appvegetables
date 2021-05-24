/* eslint-disable indent */
// You can import Ionicons from @expo/vector-icons/Ionicons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import * as React from 'react';
import {Text, View} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import Icone from 'react-native-vector-icons/MaterialCommunityIcons';
import Menu from '../pages/Menu';
import User from '../pages/user';
import Orders from '../pages/orders';
import Cart from '../pages/cart';
import AuthRoutes from './auth.routes';
import MenuRoutes from './menu.routes';

// (...)
const Tab = createBottomTabNavigator();

const tabBar: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          switch (route.name) {
            case 'Início':
              iconName = 'storefront-outline';
              break;
            case 'Carinho':
              iconName = 'shopping-bag';
              break;
            case 'Pedidos':
              iconName = 'calendar';
              break;
            case 'Configurações':
              iconName = 'user';
              break;
          }
          // You can return any component that you like here!
          return (
            <>
              {iconName === 'storefront-outline' ? (
                <Icone name={iconName} size={30} color={color} />
              ) : iconName ? (
                <Icon name={iconName} size={30} color={color} />
              ) : (
                <Icon name="home" size={30} color={color} />
              )}
            </>
          );
        },
      })}
      initialRouteName={'Menu'}
      tabBarOptions={{
        activeTintColor: '#228b22',
        inactiveTintColor: '#202020',
        tabStyle: {
          borderColor: '#fff',
        },
        style: {
          height: 60,
          borderTopWidth: 1,
          justifyContent: 'center',
          backgroundColor: '#fff',
          borderTopColor: '#228b22',
        },
        labelStyle: {
          fontSize: 14,
        },
      }}>
      <Tab.Screen name="Início" component={MenuRoutes} />
      <Tab.Screen name="Carinho" component={Cart} />
      <Tab.Screen name="Pedidos" component={Orders} />
      <Tab.Screen name="Configurações" component={User} />
    </Tab.Navigator>
  );
};
export default tabBar;

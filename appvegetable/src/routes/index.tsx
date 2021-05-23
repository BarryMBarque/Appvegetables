import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import AppProvider from '../hooks';
import {useAuth} from '../hooks/Auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import CartRoutes from './cart.routes';
import TabBarRoutes from './tabBar.routes';
const Routes: React.FC = ({children}) => {
  const {user, loading} = useAuth();

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#228b22" />
      </View>
    );
  }
  return user ? (
    <TabBarRoutes>
      <AppRoutes>{children}</AppRoutes>
      <CartRoutes>{children}</CartRoutes>
    </TabBarRoutes>
  ) : (
    <AuthRoutes />
  );
};
export default Routes;

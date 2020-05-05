import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Screens from './Screens';
//
import Login from '../features/authentication/login';
import SignUp from '../features/authentication/signup';

const AuthenticationStack = createStackNavigator({
  [Screens.LOGIN_SCREEN]: Login,
  [Screens.SIGN_UP_SCREEN]: SignUp,
});

const AppTab = createBottomTabNavigator({
  [Screens.SIGN_UP_SCREEN]: SignUp,
});

const SwitchNavigator = createSwitchNavigator({
  [Screens.AUTHENTICATION_STACK]: AuthenticationStack,
  [Screens.APP_TAB]: AppTab,
});

export default createAppContainer(SwitchNavigator);

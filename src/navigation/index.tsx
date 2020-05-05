import React from 'react';
import { withNamespaces } from 'react-i18next';
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

// Wrapping a stack with translation hoc asserts we get new render on language change
// the hoc is set to only trigger rerender on languageChanged
class WrappedStack extends React.Component {
  static router = SwitchNavigator.router;
  render() {
    const { t } = this.props;
    return <SwitchNavigator screenProps={{ t }} {...this.props} />;
  }
}

const ReloadAppOnLanguageChange = withNamespaces('common', {
  // @ts-ignore
  bindI18n: 'languageChanged',
  bindStore: false,
})(createAppContainer(WrappedStack));

export default class App extends React.Component {
  render() {
    return <ReloadAppOnLanguageChange />;
  }
}

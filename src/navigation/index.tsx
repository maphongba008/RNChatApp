import React from 'react';
import { withNamespaces } from 'react-i18next';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Screens from './Screens';
//
import Login from '../features/authentication/login';
import SignUp from '../features/authentication/signup';
import NavigationService from './NavigationService';
//
import ConversationScreen from '../features/app/conversations';
import UsersScreen from '../features/app/users';
import ChatScreen from '../features/app/chat';
import LoadingHud from './LoadingHud';
import SplashScreen from '@src/features/splash';
import Tabbar from './Tabbar';
const AuthenticationStack = createStackNavigator(
  {
    [Screens.LOGIN_SCREEN]: Login,
    [Screens.SIGN_UP_SCREEN]: SignUp,
  },
  {
    headerMode: 'none',
  },
);

const ConversationStack = createStackNavigator(
  {
    [Screens.CONVERSATION_SCREEN]: ConversationScreen,
    [Screens.CHAT_SCREEN]: ChatScreen,
  },
  {
    headerMode: 'none',
  },
);

ConversationStack.navigationOptions = ({ navigation }: { navigation: any }) => {
  const isFirstScreen = navigation.state.index === 0;
  return {
    tabBarVisible: isFirstScreen,
  };
};

const AppTab = createBottomTabNavigator(
  {
    [Screens.CONVERSATION_STACK]: ConversationStack,
    [Screens.USERS_SCREEN]: UsersScreen,
  },
  {
    tabBarComponent: ({ navigation }) => <Tabbar navigation={navigation} />,
  },
);

const SwitchNavigator = createAppContainer(
  createSwitchNavigator({
    [Screens.SPLASH_SCREEN]: SplashScreen,
    [Screens.AUTHENTICATION_STACK]: AuthenticationStack,
    [Screens.APP_TAB]: AppTab,
  }),
);

// Wrapping a stack with translation hoc asserts we get new render on language change
// the hoc is set to only trigger rerender on languageChanged
class WrappedStack extends React.Component {
  static router = SwitchNavigator.router;
  render() {
    const { t } = this.props;
    return (
      <SwitchNavigator
        // @ts-ignore
        ref={(navigatorRef: any) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
        screenProps={{ t }}
        {...this.props}
      />
    );
  }
}

const ReloadAppOnLanguageChange = withNamespaces('common', {
  // @ts-ignore
  bindI18n: 'languageChanged',
  bindStore: false,
})(WrappedStack);

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ReloadAppOnLanguageChange />
        <LoadingHud />
      </React.Fragment>
    );
  }
}

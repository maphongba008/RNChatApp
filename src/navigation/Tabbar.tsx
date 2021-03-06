import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import IconChat from '@src/assets/Chats_icon.png';
import IconUsers from '@src/assets/ic_users.png';
import IconPlus from '@src/assets/plus_Icon.png';
import { TouchableOpacity, Container } from '@src/components';
import Screens from './Screens';
import NavigationService from './NavigationService';

type TabbarProps = {
  navigation: any;
};

const Tabs = [
  {
    icon: IconChat,
    screen: Screens.CONVERSATION_STACK,
  },
  {
    icon: IconUsers,
    screen: Screens.USER_STACK,
  },
];

export default class Tabbar extends React.PureComponent<TabbarProps> {
  _onPressCreateGroup = () => {
    NavigationService.navigate(Screens.CREATE_GROUP_CHAT);
  };

  render() {
    const currentIndex = this.props.navigation.state.index;
    const tabs = this.props.navigation.state.routes;
    const currentTab = tabs[currentIndex];
    const currentTabName = currentTab.routeName;
    return (
      <View style={styles.container}>
        <View style={styles.tabbar}>
          {Tabs.map(tab => (
            <TouchableOpacity
              key={tab.screen}
              onPress={() => {
                this.props.navigation.navigate(tab.screen);
              }}
              style={styles.chatButton}>
              <Image
                source={tab.icon}
                style={[
                  currentTabName === tab.screen
                    ? styles.iconSelected
                    : styles.chatIcon,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          onPress={this._onPressCreateGroup}
          style={styles.plusButton}>
          <Image source={IconPlus} style={styles.plusIcon} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 85 + Container.bottomSpacing,
    backgroundColor: '#ffffff',
  },
  tabbar: {
    marginTop: 25,
    height: 60 + Container.bottomSpacing,
    paddingBottom: Container.bottomSpacing,
    backgroundColor: '#fbfcff',
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#d4d4d4',
  },
  chatButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatIcon: {
    tintColor: '#c1c1c1',
  },
  iconSelected: {
    tintColor: '#6274e6',
  },
  plusButton: {
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6274e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIcon: {
    tintColor: '#FFF',
  },
});

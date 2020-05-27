import React from 'react';
import { TouchableOpacity, Text } from '@src/components';
import { View, FlatList, StyleSheet } from 'react-native';
import { User } from '@src/stores/User';
import colors from '@src/constants/colors';

type ListProps = {
  users: User[];
  onPressUser: (user: User) => void;
};

export default class List extends React.PureComponent<ListProps> {
  _renderItem = ({ item }: { item: User }) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPressUser(item)}
        style={styles.container}
        activeOpacity={0.7}>
        <View style={styles.avatarView}>
          <Text style={styles.avatarText}>{item.firstName.charAt(0)}</Text>
        </View>
        <Text style={styles.nameText}>{item.displayName}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return <FlatList data={this.props.users} renderItem={this._renderItem} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  avatarView: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  nameText: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 16,
    color: colors.primary,
  },
});

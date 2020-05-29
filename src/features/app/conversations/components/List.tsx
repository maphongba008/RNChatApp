import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import Conversation from '@src/stores/Conversation';
import colors from '@src/constants/colors';
import { TouchableOpacity } from '@src/components';

type ConversationListProps = {
  conversations: Conversation[];
  currentUserId: string;
  onPressConversation: (conversation: Conversation) => void;
};

const bgColors = ['red', 'green', 'blue'];

export default class ConversationList extends React.PureComponent<
  ConversationListProps
> {
  _renderItem = ({ item: data }: { item: Conversation }) => {
    const conversationName = data.getConversationName(this.props.currentUserId);
    const backgroundColor =
      bgColors[conversationName.charCodeAt(0) % bgColors.length];
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.onPressConversation(data)}>
        <View style={[styles.avatarView, { backgroundColor }]}>
          <Text style={styles.avatarText}>{conversationName.charAt(0)}</Text>
        </View>
        <View style={styles.contentView}>
          <Text style={styles.conversationName}>{conversationName}</Text>
          {!!data.lastMessage && (
            <Text style={styles.lastMessage}>{data.lastMessage}</Text>
          )}
        </View>
        <View style={styles.unreadContainer}>
          {!!data.unreadCount && (
            <View style={styles.unreadView}>
              <Text style={styles.unreadText}>{data.unreadCount}</Text>
            </View>
          )}
          {!!data.updatedAt && (
            <Text style={styles.updatedAtText}>{data.updatedAtText}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <FlatList data={this.props.conversations} renderItem={this._renderItem} />
    );
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
  contentView: {
    flex: 1,
    marginHorizontal: 8,
  },
  conversationName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.primary,
  },
  lastMessage: {
    color: '#979797',
    fontSize: 15,
    marginTop: 4,
  },
  unreadContainer: {
    alignItems: 'flex-end',
  },
  unreadView: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: {
    color: '#FFF',
    fontSize: 12,
  },
  updatedAtText: {
    color: '#707070',
    fontSize: 12,
    marginTop: 8,
  },
});

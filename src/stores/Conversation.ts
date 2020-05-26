import { User } from './User';
import moment from 'moment';

export default class Conversation {
  constructor(
    id: string,
    name: string,
    users: User[],
    lastMessage: string,
    updatedAt: number,
    unreadCount: number,
  ) {
    this.id = id;
    this.name = name;
    this.users = users;
    this.lastMessage = lastMessage;
    this.updatedAt = updatedAt;
    this.unreadCount = unreadCount;
  }

  id: string = '';

  name: string = '';

  users: User[] = [];

  lastMessage?: string = undefined;

  updatedAt: number = 0;

  unreadCount: number = 0;

  getConversationName = (currentUserId: string) => {
    if (this.name) {
      return this.name;
    }
    const otherUser = this.users.filter(t => t.id !== currentUserId)[0];
    if (otherUser) {
      return otherUser.displayName;
    }
    return 'No name';
  };

  get updatedAtText() {
    return moment(this.updatedAt).toNow();
  }
}

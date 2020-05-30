import { User } from './User';
import moment from 'moment';
import { Expose } from 'class-transformer';
import { observable } from 'mobx';

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

  @Expose()
  id: string = '';

  @Expose()
  name: string = '';

  @Expose()
  @observable
  lastMessage?: string = undefined;

  @Expose()
  createdAt: number = 0;

  @Expose()
  @observable
  updatedAt: number = 0;

  users: User[] = [];

  @observable
  unreadCount: number = 0;

  setUsers = (users: User[]) => {
    this.users = users;
  };

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

  getDefaultUnreads = (currentUserId: string) => {
    return this.users.filter(t => t.id !== currentUserId).map(t => t.id);
  };

  findUser = (userId: string) => {
    return this.users.filter(t => t.id === userId)[0];
  };

  update = (newConversation: Conversation) => {
    this.lastMessage = newConversation.lastMessage;
    this.updatedAt = newConversation.updatedAt;
    console.log('updated');
  };

  setUnreadCount = (count: number) => {
    this.unreadCount = count;
  };
}

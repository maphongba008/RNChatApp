import { User } from './User';
import LoadingHud from '@src/navigation/LoadingHud';
import ChatServices from '@src/api/ChatServices';
import { observable } from 'mobx';
import { Message } from './Message';
import Conversation from './Conversation';

class AppStore {
  user?: User | null = null;

  @observable
  users: User[] = [];

  conversations: Conversation[] = [];

  messages: Message[] = [];

  setUser = (user: User) => {
    this.user = user;
  };

  loadUsers = async () => {
    LoadingHud.show();
    const users = await ChatServices.loadUsers();
    this.users = users.filter(t => this.user && t.id !== this.user.id);
    LoadingHud.hide();
    this.listenForUserAdded();
  };

  listenForUserAdded = () => {
    const lastUpdatedUser = this.users.sort((a, b) =>
      a.createdAt > b.createdAt ? -1 : 1,
    )[0];
    const lastUpdated = lastUpdatedUser ? lastUpdatedUser.createdAt : 0;
    ChatServices.listenForUserRegistered(lastUpdated, user => {
      this.users = [...this.users, user];
    });
  };

  createConversation = async (user: User) => {
    if (!this.user) {
      return;
    }
    const conversationId =
      user.id > this.user.id
        ? this.user.id + '_' + user.id
        : user.id + this.user.id;
    // check if conversationId exist or not
    let conversation = await ChatServices.getConversation(conversationId);
    if (!conversation) {
      // create new
      console.log('create new');
      conversation = await ChatServices.createConversation(this.user, user);
      // go to Chat Detail
    } else {
      console.log('already exist');
      // go to Chat Detail
    }
  };
}

export default new AppStore();

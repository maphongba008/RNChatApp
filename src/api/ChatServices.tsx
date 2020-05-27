import firestore from '@react-native-firebase/firestore';
import { plainToClass } from 'class-transformer';
import { User } from '@src/stores/User';
import Conversation from '@src/stores/Conversation';
class ChatServices {
  loadUsers = async () => {
    const userPromise = await firestore()
      .collection('users')
      .get();
    const users = userPromise.docs
      .map(t => t.data())
      .map(user => plainToClass(User, user, { excludeExtraneousValues: true }));
    return users;
  };

  listenForUserRegistered = (
    lastCreatedAt: number,
    onUserAdded: (user: User) => void,
  ) => {
    return firestore()
      .collection('users')
      .where('createdAt', '>', lastCreatedAt)
      .onSnapshot(snapshot => {
        console.log('on snapshot');
        snapshot.docChanges().map(doc => {
          console.log('on snapshot 2', doc);
          if (doc.type === 'added') {
            // user registered;
            const user = plainToClass(User, doc.doc.data(), {
              excludeExtraneousValues: true,
            });
            onUserAdded(user);
          }
        });
      });
  };

  getConversation = async (id: string): Promise<Conversation | null> => {
    const conversations = (await firestore()
      .collection('conversations')
      .where('id', '==', id)
      .get()).docs
      .map(t => t.data())
      .map(t =>
        plainToClass(Conversation, t, { excludeExtraneousValues: true }),
      );
    if (conversations.length > 0) {
      return conversations[0];
    }
    return null;
  };

  getUserRef = (user: User) =>
    firestore()
      .collection('users')
      .doc(user.id);

  createConversation = async (
    user1: User,
    user2: User,
  ): Promise<Conversation> => {
    const conversationId =
      user1.id < user2.id
        ? user1.id + '_' + user2.id
        : user2.id + '_' + user1.id;
    const now = Date.now();
    const data = {
      id: conversationId,
      createdAt: now,
      users: [this.getUserRef(user1), this.getUserRef(user2)],
      lastMessage: '',
    };
    // create conversation in /conversations
    const create1 = firestore()
      .collection('conversations')
      .doc(conversationId)
      .set(data);
    // create conversation in users/{id}/conversations
    const create2 = [user1, user2].map(user => {
      this.getUserRef(user)
        .collection('conversations')
        .doc(conversationId)
        .set({
          id: conversationId,
          createdAt: now,
        });
    });
    await Promise.all([create1, ...create2]);
    const conversation = plainToClass(Conversation, data, {
      excludeExtraneousValues: true,
    });
    return conversation;
  };
}

export default new ChatServices();

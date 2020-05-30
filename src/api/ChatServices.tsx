import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { plainToClass } from 'class-transformer';
import { User } from '@src/stores/User';
import Conversation from '@src/stores/Conversation';
import { Message, MessageType } from '@src/stores/Message';
class ChatServices {
  loadUser = async (userId: string) => {
    const document = await firestore()
      .collection('users')
      .doc(userId)
      .get();
    return plainToClass(User, document.data(), {
      excludeExtraneousValues: true,
    });
  };

  loadConversations = async (user: User): Promise<(Conversation | null)[]> => {
    const conversationsPromise = await firestore()
      .collection('users')
      .doc(user.id)
      .collection('conversations')
      .get();
    const promises = conversationsPromise.docs
      .map(c => c.data())
      .map(({ id }) => {
        return this.loadConversation(id, user);
      });

    const conversations = await Promise.all(promises);
    console.log('conversations', conversations);
    return conversations;
  };

  loadUsers = async () => {
    const userPromise = await firestore()
      .collection('users')
      .get();
    const users = userPromise.docs
      .map(t => t.data())
      .map(user => plainToClass(User, user, { excludeExtraneousValues: true }));
    return users;
  };

  listenForUserRegistered = (onUserAdded: (users: User[]) => void) => {
    return firestore()
      .collection('users')
      .onSnapshot(snapshot => {
        const users = snapshot
          .docChanges()
          .filter(t => t.type === 'added')
          .map(doc => {
            console.log('on snapshot 2', doc);
            // user registered;
            const user = plainToClass(User, doc.doc.data(), {
              excludeExtraneousValues: true,
            });
            return user;
          });
        onUserAdded(users);
      });
  };

  listenForConversationAdd = (
    user: User,
    onAdded: (conversations: Conversation[]) => void,
  ) => {
    return firestore()
      .collection('users')
      .doc(user.id)
      .collection('conversations')
      .onSnapshot(async snapshot => {
        const conversationsPromises = snapshot
          .docChanges()
          .filter(t => t.type === 'added')
          .map(async doc => {
            const conversationId = doc.doc.data().id;
            const conversation = await this.loadConversation(
              conversationId,
              user,
            );
            return conversation;
          });
        const conversations = await Promise.all(conversationsPromises);
        // @ts-ignore
        onAdded(conversations);
      });
  };

  loadConversation = async (
    id: string,
    user: User,
  ): Promise<Conversation | null> => {
    const conversations = (await firestore()
      .collection('conversations')
      .where('id', '==', id)
      .get()).docs
      .map(t => t.data())
      .map(async t => {
        console.log('data t', t);
        // get users array
        const usersRef: FirebaseFirestoreTypes.DocumentReference[] = t.users;
        const usersPromises = usersRef.map(async userRef => {
          if (userRef.id === user.id) {
            return user;
          }
          const mUser = await this.loadUser(userRef.id);
          return mUser;
        });
        const conversation = plainToClass(Conversation, t, {
          excludeExtraneousValues: true,
        });
        const users = await Promise.all(usersPromises);
        conversation.setUsers(users);
        return conversation;
      });
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
    conversation.setUsers([user1, user2]);
    return conversation;
  };

  listenForMessages = (
    conversationId: string,
    onMessageReceived: (message: Message) => void,
  ) => {
    return firestore()
      .collection('conversations')
      .doc(conversationId)
      .collection('messages')
      .orderBy('createdAt')
      .onSnapshot(snapshot => {
        snapshot.docChanges().map(doc => {
          if (doc.type === 'added') {
            // message arrived;
            const user = plainToClass(Message, doc.doc.data(), {
              excludeExtraneousValues: true,
            });
            onMessageReceived(user);
          }
        });
      });
  };

  sendMessage = async (
    conversationId: string,
    senderId: string,
    content: string,
    type: MessageType,
    unreads: string[],
  ) => {
    const now = Date.now();
    const doc = firestore()
      .collection('conversations')
      .doc(conversationId)
      .collection('messages')
      .doc();
    // send message to /conversations/{id}/messages
    const sendMessagePromise = doc.set({
      id: doc.id,
      createdAt: now,
      content,
      senderId,
      type,
      unreads: unreads,
    });
    // update last message to /conversations/{id}/
    const updateLastMessagePromise = firestore()
      .collection('conversations')
      .doc(conversationId)
      .update({
        updatedAt: now,
        lastMessage: content,
      });
    await Promise.all([sendMessagePromise, updateLastMessagePromise]);
  };

  listenForConversationChanged = (
    conversationId: string,
    onChanged: (conversation: Conversation) => void,
  ) => {
    return firestore()
      .collection('conversations')
      .doc(conversationId)
      .onSnapshot(snapshot => {
        console.log('listenForConversationChanged', snapshot.data());
        // conversation data
        const data = snapshot.data();
        const conversation = plainToClass(Conversation, data, {
          excludeExtraneousValues: true,
        });
        onChanged(conversation);
      });
  };

  loadUnreadCount = async (conversationId: string, userId: string) => {
    const data = await firestore()
      .collection('conversations')
      .doc(conversationId)
      .collection('messages')
      .where('unreads', 'array-contains', userId)
      .get();
    return data.docs.length;
  };

  listenForMessagesUnreadChanged = (
    conversationId: string,
    userId: string,
    onUnreadChange: (unreadCount: number) => void,
  ) => {
    return firestore()
      .collection('conversations')
      .doc(conversationId)
      .collection('messages')
      .onSnapshot(async () => {
        const unreadCount = await this.loadUnreadCount(conversationId, userId);
        onUnreadChange(unreadCount);
      });
  };

  markMessageAsRead = async (
    conversationId: string,
    messageId: string,
    userId: string,
  ) => {
    try {
      await firestore()
        .collection('conversations')
        .doc(conversationId)
        .collection('messages')
        .doc(messageId)
        .update({
          unreads: firestore.FieldValue.arrayRemove(userId),
        });
    } catch (e) {
      console.log(e);
    }
  };
}

export default new ChatServices();

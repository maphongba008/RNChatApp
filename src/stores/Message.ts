import { Expose } from 'class-transformer';
import { IMessage } from 'react-native-gifted-chat';
import { User } from './User';

export type MessageType = 'TEXT' | 'IMAGE';
export class Message {
  @Expose()
  id: string = '';
  @Expose()
  createdAt: number = 0;
  @Expose()
  content: string = '';
  @Expose()
  senderId: string = '';
  @Expose()
  type: MessageType = 'TEXT';
  @Expose()
  unreads: string[] = [];

  sender!: User;

  setSender = (user: User) => {
    this.sender = user;
  };

  toGiftedMessage = (): IMessage => {
    return {
      _id: this.id,
      createdAt: this.createdAt,
      text: this.content,
      user: {
        _id: this.sender.id,
        name: this.sender.displayName,
      },
    };
  };
}

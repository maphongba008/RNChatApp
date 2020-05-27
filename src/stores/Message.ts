export class Message {
  id: string = '';
  createdAt: number = 0;
  content: string = '';
  senderId: string = '';
  type: 'TEXT' | 'IMAGE' = 'TEXT';
  unreads: string[] = [];
}

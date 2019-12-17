export interface Message {
  text: string;
  type: MessageType;
}

export enum MessageType {
  error = 'ERROR',
  success = 'SUCCESS',
  info = 'INFO',
}

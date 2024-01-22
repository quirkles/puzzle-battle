import { io, Socket } from 'socket.io-client';
import { ClientEventPayload, userJoinGameLobby, userLogin } from './clientEventDefinitions';
import {
  isServerEvent,
  ServerEventPayloadMap,
  serverEventSchemaMap,
  ServerEventType
} from './serverEventDefinitions';

import { GameTypeEnum } from '../../__generated__/graphql';

export class EventSocketService {
  private socket: Socket | null = null;

  private listeners: {
    [event in ServerEventType]?: ((payload: ServerEventPayloadMap[event]) => void)[];
  } = {};

  constructor() {}

  private connect() {
    if (!this.socket) {
      throw new Error('Tried to connect without initializing the socket');
    }
    if (this.socket.connected) {
      return;
    }
    this.socket.connect();
  }

  private dispatch(event: ClientEventPayload): void {
    const { type, ...rest } = event;
    this.connect();
    this.socket?.emit(type, rest);
  }

  on<T extends ServerEventType>(
    event: ServerEventType,
    handler: (payload: ServerEventPayloadMap[T]) => void
  ): () => void {
    if (!this.listeners[event]) {
      this.listeners[event] = [handler];
    }
    this.listeners[event]?.push(handler);
    return () => {
      this.listeners[event] = this.listeners[event]?.filter((h) => h !== handler);
    };
  }

  initSocket(userId: string) {
    if (this.socket) {
      return;
    }
    this.socket = io(`http://localhost:3030/User:${userId}`).onAny(this.catchallHandler.bind(this));
  }

  notifyLogin(userId: string, lichessPuzzleRating: number) {
    this.initSocket(userId);
    this.dispatch(userLogin(userId, lichessPuzzleRating));
  }

  notifyUserJoinGameLobby(gameType: GameTypeEnum | null) {
    this.dispatch(userJoinGameLobby(gameType));
  }

  private catchallHandler(event: ServerEventType, payload: Record<string, unknown>) {
    if (!isServerEvent(event)) {
      console.error(`Received unexpected event: ${event}`);
      return;
    }
    const validationResult = serverEventSchemaMap[event].safeParse(payload);
    if (!validationResult.success) {
      console.error(`Failed to validate payload for event: ${event}`);
      console.error(validationResult.error);
      return;
    }
    (this.listeners[event] || []).forEach((handler) => {
      handler(validationResult.data);
    });
  }
}

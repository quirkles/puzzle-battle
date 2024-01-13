import z, { ZodSchema } from 'zod';

export type ClientEventType = 'UserLogin' | 'UserJoinGameLobby';

type BaseMap = {
  [eventName in ClientEventType]: {
    type: eventName;
  };
};

// UserLogin
const userLoginEventPayloadSchema = z.object({
  userId: z.string(),
  lichessPuzzleRating: z.number(),
  type: z.literal('UserLogin')
});

type UserLoginEventPayload = z.infer<typeof userLoginEventPayloadSchema>;

export interface ServerEventPayloadMap extends BaseMap {
  UserLogin: UserLoginEventPayload;
}

export function userLogin(userId: string, lichessPuzzleRating: number): UserLoginEventPayload {
  return {
    userId,
    lichessPuzzleRating,
    type: 'UserLogin'
  };
}

// UserJoinGameLobby

const userJoinGameLobbyEventPayloadSchema = z.object({
  gameType: z.string(),
  type: z.literal('UserJoinGameLobby')
});

type UserJoinGameLobbyEventPayload = z.infer<typeof userJoinGameLobbyEventPayloadSchema>;

export function userJoinGameLobby(gameType: string): UserJoinGameLobbyEventPayload {
  return {
    gameType,
    type: 'UserJoinGameLobby'
  };
}

export const clientEventSchemaMap: {
  [eventName in ClientEventType]: ZodSchema<ServerEventPayloadMap[eventName]>;
} = {
  UserLogin: userLoginEventPayloadSchema,
  UserJoinGameLobby: userJoinGameLobbyEventPayloadSchema
};

export type ClientEventPayload = z.infer<(typeof clientEventSchemaMap)[ClientEventType]>;

export function isClientEvent(maybeEvent: string): maybeEvent is ClientEventType {
  return maybeEvent in clientEventSchemaMap;
}

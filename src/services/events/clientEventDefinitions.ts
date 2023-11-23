import z, { ZodSchema } from 'zod';

export type ClientEventType = 'UserLogin';

type BaseMap = {
  [eventName in ClientEventType]: {
    type: eventName;
  };
};

const userLoginEventPayloadSchema = z.object({
  userId: z.string(),
  type: z.literal('UserLogin')
});

type UserLoginEventPayload = z.infer<typeof userLoginEventPayloadSchema>;

export interface ServerEventPayloadMap extends BaseMap {
  UserLogin: UserLoginEventPayload;
}

export const clientEventSchemaMap: {
  [eventName in ClientEventType]: ZodSchema<ServerEventPayloadMap[eventName]>;
} = {
  UserLogin: userLoginEventPayloadSchema
};

export function isServerEvent(maybeEvent: string): maybeEvent is ClientEventType {
  return maybeEvent in clientEventSchemaMap;
}

export function userLogin(userId: string): UserLoginEventPayload {
  return {
    userId,
    type: 'UserLogin'
  };
}

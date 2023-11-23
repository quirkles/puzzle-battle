import z, {ZodSchema} from "zod"

export type ServerEventType = 'GameStart'

type BaseMap = {
    [eventName in ServerEventType]: {
        type: eventName
    }
}

const gameStartEventPayloadSchema = z.object({
    gameId: z.string(),
    type: z.literal('GameStart')
})

type GameStartEventPayload = z.infer<typeof gameStartEventPayloadSchema>

export interface ServerEventPayloadMap extends BaseMap {
    GameStart: GameStartEventPayload
}

export const serverEventSchemaMap: {
    [eventName in ServerEventType]: ZodSchema<ServerEventPayloadMap[eventName]>
} = {
    GameStart: gameStartEventPayloadSchema
}

export function isServerEvent(maybeEvent: string): maybeEvent is ServerEventType {
    return maybeEvent in serverEventSchemaMap
}

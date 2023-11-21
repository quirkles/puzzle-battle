const OSocketEvents = {
    UserLogin: 'UserLogin'
} as const

export type SocketEventType = keyof typeof OSocketEvents
export type SocketEventTypes = typeof OSocketEvents[SocketEventType];

interface BaseSocketEvent {
    type: SocketEventType
}

interface UserLoginEvent extends BaseSocketEvent {
    userId: string;
    lichessPuzzleRating: number
    type: 'UserLogin'
}

export type SocketEvent = UserLoginEvent

export function userLogin(userId: string, lichessPuzzleRating: number): UserLoginEvent {
    return {
        userId, lichessPuzzleRating, type: 'UserLogin'
    }
}

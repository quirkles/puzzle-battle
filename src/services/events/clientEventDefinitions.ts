const OClientEvents = {
    UserLogin: 'UserLogin',
    GameStart: 'GameStart',
} as const

export type ClientEventType = keyof typeof OClientEvents
export type ClientEventTypes = typeof OClientEvents[ClientEventType];

interface BaseClientEvent {
    type: ClientEventType
}

interface UserLoginEvent extends BaseClientEvent {
    userId: string;
    type: 'UserLogin'
}

export type ClientEvent = UserLoginEvent

export function userLogin(userId: string): UserLoginEvent {
    return {
        userId, type: 'UserLogin'
    }
}

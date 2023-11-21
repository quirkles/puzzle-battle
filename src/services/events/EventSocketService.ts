import {io, Socket} from "socket.io-client";
import EventEmitter from "events";
import {SocketEvent} from "./eventDefinitions";

export class EventSocketService extends EventEmitter {
    private readonly socket: Socket;

    constructor() {
        super();
        this.socket = io('http://localhost:3030')
    }

    private connect() {
        if(this.socket.connected) {
            return
        }
        this.socket.connect()
    }

    dispatch(event: SocketEvent): void {
        const {type, ...rest} = event
        this.connect()
        this.socket.emit(type, rest)
    }

    subscribe(event: string, handler: (...args: unknown[]) => unknown) {
        return this.socket.on(event, handler)
    }
}

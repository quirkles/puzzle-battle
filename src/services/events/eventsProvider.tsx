'use client'
import {io, Socket} from "socket.io-client";
import {createContext, PropsWithChildren, useContext, useReducer} from 'react';

const EventsContext = createContext<Socket | null>(null);

const socket = io('http://localhost:3030');


export function EventsProvider({children}: PropsWithChildren) {
    return (
        <EventsContext.Provider value={socket}>
            {children}
        </EventsContext.Provider>
    );
}

export function useEvents () {
    return useContext(EventsContext)
}

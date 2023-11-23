'use client';
import { createContext, PropsWithChildren, useContext } from 'react';
import { EventSocketService } from './EventSocketService';

const eventSocketService = new EventSocketService();

const EventsContext = createContext<EventSocketService>(eventSocketService);

export function EventsProvider({ children }: PropsWithChildren) {
  return <EventsContext.Provider value={eventSocketService}>{children}</EventsContext.Provider>;
}

export function useEvents() {
  return useContext(EventsContext);
}

'use client';
import { createContext, useContext, ReactNode } from 'react';
import { OAuthService } from './OAuthService';
interface IOauthContext {
  oauthService: OAuthService;
}

const OauthContext = createContext({} as IOauthContext);

export function OAuthProvider({ children }: { children: ReactNode }) {
  const oauthService = new OAuthService();

  return <OauthContext.Provider value={{ oauthService }}>{children}</OauthContext.Provider>;
}

export function useOauthContext() {
  return useContext(OauthContext);
}

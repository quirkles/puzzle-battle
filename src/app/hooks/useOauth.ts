import { AccessToken, OAuthService } from '../../services/lichess/OAuthService';
import { useState } from 'react';

interface UseOauthServiceReturn {
  accessToken: AccessToken | null;
  beginAuthFlow: () => void;
  // eslint-disable-next-line no-unused-vars
  setAccessToken: (accessToken: AccessToken) => void;
  logout: () => void;
}

export function useOauthService(oAuthServiceInstance: OAuthService): UseOauthServiceReturn {
  const [accessToken, setAccessToken] = useState(oAuthServiceInstance.getAccessToken());
  return {
    accessToken,
    beginAuthFlow: oAuthServiceInstance.beginAuthFlow.bind(oAuthServiceInstance),
    setAccessToken: oAuthServiceInstance.setAccessToken.bind(oAuthServiceInstance),
    logout: () => {
      oAuthServiceInstance.logout.call(oAuthServiceInstance);
      setAccessToken(null);
    }
  };
}

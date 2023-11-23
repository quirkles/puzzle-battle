'use client';

import { v4 } from 'uuid';
import axios from 'axios';

const LOCAL_STORAGE_KEYS = {
  code_verifier: 'code_verifier',
  access_token_value: 'access_token_value',
  access_expires_at: 'access_expires_at',
  lichess_oauth_state: 'lichess_oauth_state'
} as const;

export interface AccessToken {
  value: string;
  expiresAt: number;
}

export class OAuthService {
  private clientId = 'puzzle-battle';
  private clientUrl = global['location']
    ? `${location.protocol}//${location.host}/oauthRedirect`
    : '';
  private lichessHost = 'https://lichess.org';

  private readonly code_verifier: string = '';
  private readonly state: string = '';

  private accessToken: AccessToken | null = null;

  constructor() {
    if (!global['localStorage']) {
      return;
    }

    let code_verifier = localStorage.getItem(LOCAL_STORAGE_KEYS.code_verifier);
    if (!code_verifier) {
      code_verifier = `${v4()}${v4()}`;
      localStorage.setItem(LOCAL_STORAGE_KEYS.code_verifier, code_verifier);
    }
    this.code_verifier = code_verifier;

    let state = localStorage.getItem(LOCAL_STORAGE_KEYS.lichess_oauth_state);
    if (!state) {
      state = v4();
      localStorage.setItem(LOCAL_STORAGE_KEYS.lichess_oauth_state, state);
    }
    this.state = state;

    let access_token_value = localStorage.getItem(LOCAL_STORAGE_KEYS.access_token_value);
    let access_expires_at = localStorage.getItem(LOCAL_STORAGE_KEYS.access_expires_at);

    if (access_token_value && access_expires_at) {
      if (Number(access_expires_at) > Date.now() + 60000) {
        this.accessToken = {
          value: access_token_value,
          expiresAt: Number(access_expires_at)
        };
        return;
      }
    }
  }

  isAuthorized(): boolean {
    return (
      (this.accessToken &&
        this.accessToken.value &&
        this.accessToken.expiresAt > Date.now() + 60000) ||
      false
    );
  }

  getAccessToken(): AccessToken | null {
    if (
      this.accessToken &&
      this.accessToken.value &&
      this.accessToken.expiresAt > Date.now() + 60000
    ) {
      return this.accessToken;
    }
    if (global['localStorage']) {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.access_token_value);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.access_expires_at);
    }
    return null;
  }

  setAccessToken(accessToken: AccessToken) {
    this.accessToken = accessToken;
  }

  verifyState(state: string): boolean {
    return state === this.state;
  }

  beginAuthFlow() {
    this.getBase64UrlEncodedCodeVerifier().then((code_challenge) => {
      window.location.href = `${this.lichessHost}/oauth?response_type=code&client_id=${this.clientId}&redirect_uri=${this.clientUrl}&code_challenge_method=S256&code_challenge=${code_challenge}&state=${this.state}`;
    });
  }

  async getBase64UrlEncodedCodeVerifier(): Promise<string> {
    const hash = await window.crypto.subtle.digest(
      'SHA-256',
      Buffer.from(this.code_verifier, 'utf-8')
    );

    return window
      .btoa(Buffer.from(hash).toString('binary'))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  async fetchAccessToken(code: string): Promise<AccessToken> {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('code_verifier', this.code_verifier);
    params.append('redirect_uri', this.clientUrl);
    params.append('client_id', this.clientId);

    let resp = await axios.post(`${this.lichessHost}/api/token`, params);
    const { access_token, expires_in } = resp.data;
    const expiresAt = Date.now() + expires_in;
    localStorage.setItem(LOCAL_STORAGE_KEYS.access_token_value, access_token);
    localStorage.setItem(LOCAL_STORAGE_KEYS.access_expires_at, expiresAt);
    this.accessToken = {
      value: access_token,
      expiresAt
    };
    return {
      value: access_token,
      expiresAt: expiresAt
    };
  }

  logout() {
    this.accessToken = null;
    if (global['localStorage']) {
      for (const key in LOCAL_STORAGE_KEYS) {
        localStorage.removeItem(key);
      }
    }
  }
}

'use client'

import {v4} from 'uuid'
import axios from 'axios'

const LOCAL_STORAGE_KEYS = {
    code_verifier: 'code_verifier',
    access_token_value: 'access_token_value',
    access_expires_at: 'access_expires_at',
    lichess_oauth_state: 'lichess_oauth_state',
} as const

export class OauthService {
    private clientId = 'puzzle-battle';
    private clientUrl = global["location"] ? `${location.protocol}//${location.host}/oauthRedirect` : "";
    private lichessHost = 'https://lichess.org';

    private readonly code_verifier: string = ''
    private readonly state: string = ''

    private token: { value: string, expiresAt: number } | null = null;

    constructor() {
        if (!global['localStorage']) {
            return
        }

        let code_verifier = localStorage.getItem(LOCAL_STORAGE_KEYS.code_verifier)
        if (!code_verifier) {
            code_verifier = `${v4()}${v4()}`
            localStorage.setItem(LOCAL_STORAGE_KEYS.code_verifier, code_verifier)
        }
        this.code_verifier = code_verifier

        let state = localStorage.getItem(LOCAL_STORAGE_KEYS.lichess_oauth_state)
        if (!state) {
            state = v4()
            localStorage.setItem(LOCAL_STORAGE_KEYS.lichess_oauth_state, state)
        }
        this.state = state

        let access_token_value = localStorage.getItem(LOCAL_STORAGE_KEYS.access_token_value)
        let access_expires_at = localStorage.getItem(LOCAL_STORAGE_KEYS.access_expires_at)

        if (access_token_value && access_expires_at) {
            if (Number(access_expires_at) > (Date.now() + 60000)) {
                this.token = {
                    value: access_token_value,
                    expiresAt: Number(access_expires_at)
                }
                return
            }
        }
    }


    isAuthorized(): boolean {
        return (this.token && this.token.value && (this.token.expiresAt > (Date.now() + 60000))) || false
    }

    get accessToken(): string | null {
        return (this.token && this.token.value && (this.token.expiresAt > (Date.now() + 60000))) && this.token.value || null
    }

    verifyState(state: string): boolean {
        return state === this.state
    }

    beginAuthFlow() {
        this.getBase64UrlEncodedCodeVerifier().then(code_challenge => {
            window.location.href = `${this.lichessHost}/oauth?response_type=code&client_id=${this.clientId}&redirect_uri=${this.clientUrl}&code_challenge_method=S256&code_challenge=${code_challenge}&state=${this.state}`
        })
    }

    async getBase64UrlEncodedCodeVerifier(): Promise<string> {
        const hash = await window.crypto.subtle.digest('SHA-256', Buffer.from(this.code_verifier, 'utf-8'))

        return window.btoa(
            Buffer.from(hash)
                .toString('binary'))
            .replace(/=/g, "")
            .replace(/\+/g, "-")
            .replace(/\//g, "_");

    }


    getAccessToken(code: string): Promise<string> {
        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code')
        params.append('code', code)
        params.append('code_verifier', this.code_verifier)
        params.append('redirect_uri', this.clientUrl)
        params.append('client_id', this.clientId)

        return axios.post(`${this.lichessHost}/api/token`, params).then(resp => {
            const {
                access_token,
                expires_in
            } = resp.data

            const expiresAt = Date.now() + expires_in
            localStorage.setItem(LOCAL_STORAGE_KEYS.access_token_value, access_token)
            localStorage.setItem(LOCAL_STORAGE_KEYS.access_expires_at, expiresAt)
            this.token = {
                value: access_token,
                expiresAt,
            }
            return access_token
        })
    }

    logout(){
        for(const key in LOCAL_STORAGE_KEYS) {
            window.localStorage.removeItem(key)
        }
    }
}

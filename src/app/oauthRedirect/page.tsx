'use client'
import {useEffect} from "react";
import {useSearchParams, redirect, useRouter} from "next/navigation";
import {useOauthContext} from "../../services";
import {
    activeUserSlice,
    useDispatch,
} from "../../redux";
import {useOauthService} from "../hooks";

export default function OauthRedirect() {
    const { oauthService } = useOauthContext()
    const {accessToken, setAccessToken} = useOauthService(oauthService)
    const searchParams = useSearchParams();
    const dispatch = useDispatch()
    const {push} = useRouter();

    const code = searchParams.get('code')
    const state = searchParams.get('state')
    useEffect(() => {
        // if we're already authorized, just go to home
        if(accessToken) {
            redirect('/home')
        }
        // if we are coming back from lichess after authorizing the app, the happy path, check the params and verify the state
        if (code && state && oauthService.verifyState(state)) {
            oauthService.fetchAccessToken(code).then((accessToken) => {
                setAccessToken(accessToken)
                dispatch(activeUserSlice.actions.setLichessAccessToken(accessToken.value))
            }).catch((err) => {
                console.error('caught auth error', err)
                return push('/login')
            })
        } else {
            redirect('/login')
        }
    }, [accessToken])
    return (
        <div>Oauth redirect</div>
    )
}

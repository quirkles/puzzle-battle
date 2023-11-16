'use client'
import {useEffect} from "react";
import {useSearchParams, redirect, useRouter} from "next/navigation";
import {useOauthContext} from "../../services/lichess/OAuthProvider";
import {
    activeUserSlice,
    selectActiveUserLichessAccessToken,
    selectActiveUserLichessData,
    useDispatch,
    useSelector
} from "../../redux";

export default function OauthRedirect() {
    const { oauthService } = useOauthContext()
    const searchParams = useSearchParams();
    const dispatch = useDispatch()
    const accessToken = useSelector(selectActiveUserLichessAccessToken)
    const {push} = useRouter();

    const code = searchParams.get('code')
    const state = searchParams.get('state')
    useEffect(() => {
        // if we're already authorized, just go to home
        if(oauthService.isAuthorized()) {
            redirect('/home')
        }
        // if we are coming back from lichess after authorizing the app, the happy path, check the params and verify the state
        if (code && state && oauthService.verifyState(state)) {
            oauthService.getAccessToken(code).then((accessToken) => {
                dispatch(activeUserSlice.actions.setLichessAccessToken(accessToken))
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

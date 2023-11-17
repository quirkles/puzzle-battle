'use client'

import {useEffect} from "react";
import {redirect} from "next/navigation";
import {Button} from "../../components";
import {useOauthContext} from "../../services/lichess/OAuthProvider";
import {activeUserSlice, selectActiveUserLichessAccessToken, useSelector} from "../../redux";
import {useOauthService} from "../hooks/useOauth";

export default function Login() {
    const {oauthService} = useOauthContext()
    const {accessToken} = useOauthService(oauthService)
    useEffect(() => {
        if(accessToken) {
            redirect('./home')
        }
    }, [accessToken])
    return (
        <div>
            <div>
                <Button
                    text="Login"
                    onClick={oauthService.beginAuthFlow.bind(oauthService)}
                />
            </div>
        </div>
    )
}

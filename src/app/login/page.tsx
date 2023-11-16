'use client'

import {useEffect} from "react";
import {redirect} from "next/navigation";
import {Button} from "../../components";
import {useOauthContext} from "../../services/lichess/OAuthProvider";

export default function Login() {
    const {oauthService} = useOauthContext()
    useEffect(() => {
        if(oauthService.isAuthorized()) {
            redirect('./home')
        }
    }, [oauthService, oauthService.accessToken])
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

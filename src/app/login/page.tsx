'use client'

import {useEffect} from "react";
import {redirect} from "next/navigation";
import {Button} from "../../components";
import {useOauthContext} from "../../services/lichess/OAuthProvider";
import {activeUserSlice, selectActiveUserLichessAccessToken, useSelector} from "../../redux";

export default function Login() {
    const {oauthService} = useOauthContext()
    const accessToken = useSelector(selectActiveUserLichessAccessToken)
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

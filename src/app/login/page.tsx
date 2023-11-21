'use client'

import {useEffect} from "react";
import {redirect} from "next/navigation";

import "./login.scss"

import {Button} from "../../components";
import {useOauthContext} from "../../services";
import {useOauthService} from "../hooks/useOauth";
import {Colors} from "../../colors";

export default function Login() {
    const {oauthService} = useOauthContext()
    const {accessToken} = useOauthService(oauthService)
    useEffect(() => {
        if(accessToken) {
            redirect('./home')
        }
    }, [accessToken])
    return (
        <div id="login-page" className="grid grid-cols-3 grid-rows-1 auto-rows-max auto-cols-max">
            <div className="col-start-2 justify-self-stretch justify-center items-center self-center col-span-1 flex flex-col">
                <h1 className="text-white uppercase border-4 border-white rounded py-8 px-12 m-4 text-2xl font-bold">Sign in with lichess to play</h1>
                <div>
                    <Button
                        color={Colors.BLUE}
                        text="Login"
                        onClick={oauthService.beginAuthFlow.bind(oauthService)}
                    />
                </div>
            </div>
        </div>
    )
}

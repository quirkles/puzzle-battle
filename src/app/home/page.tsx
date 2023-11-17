'use client'

import {EventHandler, MouseEvent, SyntheticEvent, useEffect, useState} from "react";
import {redirect} from "next/navigation";
import {useOauthContext} from "../../services/lichess/OAuthProvider";
import {
    activeUserSlice,
    fetchLichessAccountInfo,
    selectActiveUserLichessData,
    useDispatch,
    useSelector
} from "../../redux";
import {Button, Header} from "../../components";
import {useOauthService} from "../hooks/useOauth";


export default function Home() {
    const {oauthService} = useOauthContext()
    const {accessToken, logout} = useOauthService(oauthService)
    const {username, userId, puzzleRating} = useSelector(selectActiveUserLichessData)
    const dispatch = useDispatch()
    const doLogout = () => {
        logout()
        dispatch(activeUserSlice.actions.logoutLichessUser())
    }
    useEffect(() => {
        if(accessToken) {
            if(!(username && userId)) {
                dispatch(fetchLichessAccountInfo(accessToken.value))
            }
        } else {
            redirect('./login')
        }
    }, [accessToken, userId, username])
    return ((userId && username) ? <HomeLoggedIn lichessUsername={username} logout={doLogout}/>  : <div>Loading</div>)
}

interface HomeLoggedInProps{
    lichessUsername: string,
    logout: EventHandler<MouseEvent<HTMLButtonElement>>
}
function HomeLoggedIn(props: HomeLoggedInProps) {
    return(
        <>
            <Header>
                <span>Hello {props.lichessUsername}</span>
                <Button text="Logout" onClick={props.logout}></Button>
            </Header>
        </>
    )
}

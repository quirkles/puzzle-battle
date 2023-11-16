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


export default function Home() {
    const {oauthService} = useOauthContext()
    const {username, userId, accessToken, puzzleRating} = useSelector(selectActiveUserLichessData)
    const dispatch = useDispatch()
    const logout = () => {
        oauthService.logout()
        dispatch(activeUserSlice.actions.logoutLichessUser())
    }
    useEffect(() => {
        if(accessToken) {
            dispatch(fetchLichessAccountInfo(accessToken))
        } else {
            redirect('./login')
        }
    }, [accessToken])
    return ((userId && username) ? <HomeLoggedIn lichessUsername={username} logout={logout}/>  : <div>Loading</div>)
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

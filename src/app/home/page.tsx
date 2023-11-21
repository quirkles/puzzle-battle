'use client'

import {EventHandler, MouseEvent, SyntheticEvent, useEffect, useState} from "react";
import {redirect} from "next/navigation";
import {useOauthContext} from "../../services";
import {
    activeUserSlice,
    fetchLichessAccountInfo,
    selectActiveUserLichessData,
    useDispatch,
    useSelector
} from "../../redux";
import {Button, Header} from "../../components";
import {useOauthService} from "../hooks";


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
    return ((userId && username) ? <HomeLoggedIn logout={doLogout}/>  : <div>Loading</div>)
}

interface HomeLoggedInProps{
    logout: EventHandler<MouseEvent<HTMLButtonElement>>
}
function HomeLoggedIn(props: HomeLoggedInProps) {
    const {username, userId, puzzleRating} = useSelector(selectActiveUserLichessData)
    useEffect(() => {

    }, [username, userId, puzzleRating]);
    return(
        <>
            <Header>
                <span>Hello {username}</span>
                <Button text="Logout" onClick={props.logout} color={'red'}></Button>
            </Header>
        </>
    )
}

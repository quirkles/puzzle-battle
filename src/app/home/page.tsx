'use client'

import {useEffect, useState} from "react";
import {redirect} from "next/navigation";
import {useOauthContext} from "../../services/lichess/OAuthProvider";
import {fetchLichessAccountInfo, selectActiveUserLichessId, useDispatch, useSelector} from "../../redux";


export default function Home() {
    const {oauthService} = useOauthContext()
    const lichessId = useSelector(selectActiveUserLichessId)
    const dispatch = useDispatch()
    useEffect(() => {
        if(oauthService.accessToken) {
            dispatch(fetchLichessAccountInfo(oauthService.accessToken))
        } else {
            redirect('./login')
        }
    }, [oauthService.accessToken])
    return (lichessId ? <div>Welcome: {lichessId}</div> : <div>Loading</div>)
}

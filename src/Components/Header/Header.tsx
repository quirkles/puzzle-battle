'use client'

import {activeUserSlice, selectActiveUserLichessId, useDispatch, useSelector} from "../../redux";
import {Button} from "../Button";

interface HeaderProps {
}

export function Header(props: HeaderProps) {
    const lichessId = useSelector(selectActiveUserLichessId)
    const dispatch = useDispatch()
    function handleLogin(){
        dispatch(activeUserSlice.actions.setLichessId('test'))
    }
    return (
        <>
            {lichessId ?
                <h4>Hello {lichessId}</h4> :
                <div>
                    <span>
                        Please login with lichess
                    </span>
                    <Button
                        text="Login"
                        onClick={handleLogin}
                    />
                </div>
            }
        </>
    )
}

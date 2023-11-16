'use client'

import {selectActiveUserLichessId, useSelector} from "../../redux";

interface HeaderProps {
}

export function Header(props: HeaderProps) {
    const lichessId = useSelector(selectActiveUserLichessId)
    return (
        <>
            {lichessId ?
                <h4>Hello</h4> :
                <div>
                    <span>
                        Please login with lichess
                    </span>
                    <button>Login</button>
                </div>
            }
        </>
    )
}

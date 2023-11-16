'use client'

import {activeUserSlice, selectActiveUserLichessId, useDispatch, useSelector} from "../../redux";
import {Button} from "../Button";
import {PropsWithChildren} from "react";

interface HeaderProps extends PropsWithChildren{
}

export function Header(props: HeaderProps) {
    return (
        <header>
            {props.children}
        </header>
    )
}

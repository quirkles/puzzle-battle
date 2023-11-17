import {EventHandler, MouseEvent, useEffect, useState} from "react";
import {getButtonClassName} from "./className";
import {Color} from "../../colors";

interface ButtonProps {
    text: string;
    color: Color;
    onClick: EventHandler<MouseEvent<HTMLButtonElement>>
}

export function Button(props: ButtonProps) {
    const {text, onClick, color} = props
    const [className, setClassName] = useState(getButtonClassName(color))
    useEffect(() => {
        setClassName(getButtonClassName(color))
    }, [color]);
    function handleClick(e:MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        e.stopPropagation()
        onClick(e)
    }
    return (
        <button className={className} onClick={handleClick}>{text}</button>
    )
}

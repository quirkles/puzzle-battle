import {EventHandler, MouseEvent} from "react";

interface ButtonProps {
    text: string;
    onClick: EventHandler<MouseEvent<HTMLButtonElement>>
}

export function Button(props: ButtonProps) {
    const {text, onClick} = props
    function handleClick(e:MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        e.stopPropagation()
        onClick(e)
    }
    return (
        <button onClick={handleClick}>{text}</button>
    )
}

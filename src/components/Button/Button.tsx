import {EventHandler, MouseEvent} from "react";

interface ButtonProps {
    text: string;
    onClick: EventHandler<MouseEvent<HTMLButtonElement>>
}

const tailwindClass = "hover:text-white text-blue relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-blue before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-blue before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"

export function Button(props: ButtonProps) {
    const {text, onClick} = props
    function handleClick(e:MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        e.stopPropagation()
        onClick(e)
    }
    return (
        <button className={tailwindClass} onClick={handleClick}>{text}</button>
    )
}

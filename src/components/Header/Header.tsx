'use client'

import {PropsWithChildren} from "react";

interface HeaderProps extends PropsWithChildren{
}

export function Header(props: HeaderProps) {
    return (
        <header className="bg-white lg:py-8">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <nav className="relative flex items-center justify-between h-16 bg-white lg:rounded-md lg:shadow-lg lg:h-24 lg:px-8 lg:py-6">
                    {props.children}
                </nav>
            </div>
        </header>
    )
}

export function Left({children}: PropsWithChildren){
    return (
        <div>
            {children}
        </div>
    )
}
export function Center({children}: PropsWithChildren){
    return (
        <div>
            {children}
        </div>
    )
}
export function Right({children}: PropsWithChildren){
    return (
        <div>
            {children}
        </div>
    )
}

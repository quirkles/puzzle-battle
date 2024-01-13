'use client';

import { PropsWithChildren } from 'react';

interface HeaderProps extends PropsWithChildren {}

export function Header(props: HeaderProps) {
  return (
    <header>
      <nav className="relative bg-white flex items-center justify-between lg:rounded-md lg:shadow-lg h-16 lg:h-24 px-12 lg:py-6 gap-4">
        {props.children}
      </nav>
    </header>
  );
}

export function Left({ children }: PropsWithChildren) {
  return <div className="grow flex order-1 place-content-start items-center gap-4">{children}</div>;
}
export function Center({ children }: PropsWithChildren) {
  return (
    <div className="grow flex order-2 place-content-center items-center gap-4">{children}</div>
  );
}
export function Right({ children }: PropsWithChildren) {
  return <div className="grow flex order-3 place-content-end items-center gap-4">{children}</div>;
}

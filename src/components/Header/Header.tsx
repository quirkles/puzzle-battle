'use client';

import { PropsWithChildren } from 'react';

interface HeaderProps extends PropsWithChildren {}

export function Header(props: HeaderProps) {
  return (
    <header className="mb-4 px-12 bg-white h-16">
      <nav className="h-full relative flex items-center justify-between lg:rounded-md lg:shadow-lg lg:h-24 lg:px-8 lg:py-6 gap-4">
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

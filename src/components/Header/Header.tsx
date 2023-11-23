'use client';

import { PropsWithChildren } from 'react';

interface HeaderProps extends PropsWithChildren {}

export function Header(props: HeaderProps) {
  return <header>{props.children}</header>;
}

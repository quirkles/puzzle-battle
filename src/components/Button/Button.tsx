import { IconType } from 'react-icons';
import { EventHandler, MouseEvent, useEffect, useState } from 'react';
import { getButtonClassName } from './className';
import { Color } from '../../colors';

type ButtonProps =
  | {
      color: Color;
      onClick: EventHandler<MouseEvent<HTMLButtonElement>>;
      text: string;
    }
  | {
      onClick: EventHandler<MouseEvent<HTMLButtonElement>>;
      color: Color;
      icon: IconType;
    };

export function Button(props: ButtonProps) {
  const { onClick, color } = props;
  const [className, setClassName] = useState(getButtonClassName(color));
  useEffect(() => {
    setClassName(getButtonClassName(color));
  }, [color]);
  const content = 'text' in props ? props.text : <props.icon />;
  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    onClick(e);
  }
  return (
    <button className={className} onClick={handleClick}>
      {content}
    </button>
  );
}

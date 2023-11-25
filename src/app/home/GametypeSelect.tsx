import { PropsWithChildren } from 'react';
import {randomProperty} from "../../utils/getRandomKey";

type GameType = {
  type: string;
  description: string;
  title: string;
};

export function GameTypeSelect(props: PropsWithChildren<{ gameTypes: GameType[] }>) {
  return (
    <div className="w-full grid grid-cols-3 gap-4 auto-rows-fr">
      {props.gameTypes.map((g) => (
        <GameType key={g.type} {...g} />
      ))}
    </div>
  );
}

export function GameType(props: PropsWithChildren<GameType>) {
  return (
    <div className={randomProperty(classNames)}>
      <h5 className="text-center">{props.title}</h5>
    </div>
  );
}

const classNames = {
  blue: 'w-full h-full bg-white border-b-4 border-b-blue text-blue py-12 px-12 text-xl hover:cursor-pointer justify-center items-center flex shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out',
  red: 'w-full h-full bg-white border-b-4 border-b-red text-red py-12 px-12 text-xl hover:cursor-pointer justify-center items-center flex shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out',
  yellow:
    'w-full h-full bg-white border-b-4 border-b-yellow text-yellow py-12 px-12 text-xl hover:cursor-pointer justify-center items-center flex shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out',
  orange:
    'w-full h-full bg-white border-b-4 border-b-orange text-orange py-12 px-12 text-xl hover:cursor-pointer justify-center items-center flex shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out',
  purple:
    'w-full h-full bg-white border-b-4 border-b-purple text-purple py-12 px-12 text-xl hover:cursor-pointer justify-center items-center flex shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out'
};

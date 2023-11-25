import { PropsWithChildren } from 'react';

type GameType = {
  type: string;
  description: string;
  title: string;
};

export function GameTypeSelect(props: PropsWithChildren<{ gameTypes: GameType[] }>) {
  return (
    <div className="w-full bg-white grid grid-cols-3 gap-4 auto-rows-fr">
      {props.gameTypes.map((g) => (
        <GameType key={g.type} {...g} />
      ))}
    </div>
  );
}

export function GameType(props: PropsWithChildren<GameType>) {
  return (
    <div className="w-full h-full bg-white border-b-4 border-b-blue-600 text-blue-600 py-12 px-12 text-xl hover:cursor-pointer justify-center items-center flex shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <h5 className="text-center">{props.title}</h5>
    </div>
  );
}

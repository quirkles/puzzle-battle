import { PropsWithChildren } from 'react';
import { randomKey } from '../../utils/object';
import { Button } from '../../components';
import { merriweather } from '../fonts';

type GameType = {
  type: string;
  description: string;
  title: string;
};

export function GameTypeSelect(
  props: PropsWithChildren<{ gameTypes: GameType[]; onSelectGameType: (gameType: string) => void }>
) {
  return (
    <div className="w-full grid grid-cols-3 gap-4 auto-rows-fr">
      {props.gameTypes.map((g) => (
        <GameType key={g.type} game={g} onSelectGameType={props.onSelectGameType} />
      ))}
    </div>
  );
}

export function GameType(
  props: PropsWithChildren<{ game: GameType; onSelectGameType: (gameType: string) => void }>
) {
  const color = randomKey(classNames);
  return (
    <div className={classNames[color]}>
      <h5 className={`text-center py-4 border-b-2 text-xl font-bold ${merriweather.className}`}>
        {props.game.title}
      </h5>
      <div className="p-12 text-center">
        <p className="mb-4">{props.game.description}</p>
        <Button color={color} text="play" onClick={() => props.onSelectGameType(props.game.type)} />
      </div>
    </div>
  );
}

const classNames = {
  blue: 'w-full h-full bg-white border-b-blue text-blue shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out',
  green:
    'w-full h-full bg-white border-b-green text-green shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out',
  red: 'w-full h-full bg-white border-b-red text-red shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out',
  black:
    'w-full h-full bg-white border-b-black text-black shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out',
  orange:
    'w-full h-full bg-white border-b-orange text-orange shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out',
  purple:
    'w-full h-full bg-white border-b-purple text-purple shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out'
};

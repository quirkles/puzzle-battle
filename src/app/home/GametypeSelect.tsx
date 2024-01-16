import { useQuery } from '@apollo/client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { TbChessQueen, TbChessBishop, TbChessRook, TbChessKing } from 'react-icons/tb';
import { randomKey, randomElement } from '../../utils';
import { Button } from '../../components';
import { merriweather } from '../fonts';

import { GameTypeEnum } from '../../__generated__/graphql';
import { LIVE_SUMMARY } from '../../services/graphql/queries/getLiveSummary';

type GameType = {
  type: GameTypeEnum;
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
  const { loading, data: liveSummaryQueryResult } = useQuery(LIVE_SUMMARY, { pollInterval: 1000 });
  const [currentlyPlayingCount, setCurrentlyPlayingCount] = useState<number>(0);
  useEffect(() => {
    setCurrentlyPlayingCount(
      liveSummaryQueryResult?.liveSummary.find((g) => g.type === props.game.type)
        ?.activePlayerCount || 0
    );
  }, [liveSummaryQueryResult, props.game.type]);
  return (
    <div className={classNames[color]}>
      <h5 className={`text-center py-4 border-b-2 text-xl font-bold ${merriweather.className}`}>
        {props.game.title}
      </h5>
      <div className="p-12 text-center">
        <p className="mb-4">{props.game.description}</p>
        <small className="mb-4 block">
          {loading ? 'Fetching data...' : `${currentlyPlayingCount} active players`}
        </small>
        <Button
          color={color}
          icon={randomElement(chessIcons)}
          onClick={() => props.onSelectGameType(props.game.type)}
        />
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

const chessIcons: IconType[] = [TbChessQueen, TbChessBishop, TbChessRook, TbChessKing];

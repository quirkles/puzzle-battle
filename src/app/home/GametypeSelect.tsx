import { useQuery } from '@apollo/client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { TbChessQueen, TbChessBishop, TbChessRook, TbChessKing, TbX } from 'react-icons/tb';
import { randomKey, randomElement } from '../../utils';
import { Button, Spinner } from '../../components';
import { merriweather } from '../fonts';

import { GameTypeEnum } from '../../__generated__/graphql';
import { LIVE_SUMMARY } from '../../services/graphql/queries/getLiveSummary';

type GameType = {
  type: GameTypeEnum;
  description: string;
  title: string;
};

export function GameTypeSelect(
  props: PropsWithChildren<{
    gameTypes: GameType[];
    onSelectGameType: (gameType: GameTypeEnum | null) => void;
    lookingForGameType: GameTypeEnum | null;
  }>
) {
  console.log(props.lookingForGameType, 'lookingForGameType');
  return (
    <div className="w-full grid grid-cols-3 gap-4 auto-rows-fr">
      {props.gameTypes.map((g) => (
        <GameType
          key={g.type}
          game={g}
          onSelectGameType={props.onSelectGameType}
          isLookingForThisGame={props.lookingForGameType === g.type}
        />
      ))}
    </div>
  );
}

export function GameType(
  props: PropsWithChildren<{
    game: GameType;
    onSelectGameType: (gameType: GameTypeEnum | null) => void;
    isLookingForThisGame: boolean;
  }>
) {
  const color = randomKey(classNames, props.game.type);
  const { loading, data: liveSummaryQueryResult } = useQuery(LIVE_SUMMARY, { pollInterval: 1000 });
  const [currentlyPlayingCount, setCurrentlyPlayingCount] = useState<number>(0);
  useEffect(() => {
    setCurrentlyPlayingCount(
      liveSummaryQueryResult?.liveSummary.find((g) => g.type === props.game.type)
        ?.activePlayerCount || 0
    );
  }, [liveSummaryQueryResult, props.game.type]);
  return (
    <div className={classNames[color].main}>
      <h5 className={`text-center py-4 border-b-2 text-xl font-bold ${merriweather.className}`}>
        {props.game.title}
      </h5>
      <div className={classNames[color].overlay[props.isLookingForThisGame ? 'up' : 'down']}>
        <div
          className="absolute top-1 right-1 text-white cursor-pointer"
          onClick={() => props.onSelectGameType(null)}
        >
          <TbX size="36" />
        </div>
        <h3 className="text-white mb-8">Finding opponent...</h3>
        <Spinner color="white" />
        <div className="mt-8" />
      </div>
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
  blue: {
    main: 'w-full h-full bg-white border-b-blue text-blue shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out overflow-hidden',
    overlay: {
      up: `flex items-center flex-col opacity-90 justify-center transition-translate duration-300 absolute w-full h-full z-10 bg-blue cursor-progress`,
      down: `flex items-center flex-col justify-center transition-translate duration-300 absolute w-full h-full z-10 bg-blue cursor-progress translate-y-full`
    }
  },
  green: {
    main: 'w-full h-full bg-white border-b-green text-green shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out overflow-hidden',
    overlay: {
      up: `flex items-center flex-col opacity-90 justify-center transition-translate duration-300 absolute w-full h-full z-10 bg-green cursor-progress`,
      down: `flex items-center flex-col justify-center transition-translate duration-300 absolute w-full h-full z-10 bg-green cursor-progress translate-y-full`
    }
  },
  red: {
    main: 'w-full h-full bg-white border-b-red text-red shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out overflow-hidden',
    overlay: {
      up: `flex items-center opacity-90 flex-col justify-center transition-translate duration-300 absolute w-full h-full z-10 bg-red cursor-progress`,
      down: `flex items-center flex-col justify-center transition-translate duration-300 absolute w-full h-full z-10 bg-red cursor-progress translate-y-full`
    }
  },
  black: {
    main: 'w-full h-full bg-white border-b-black text-black shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out overflow-hidden',
    overlay: {
      up: `flex flex-col opacity-90 items-center justify-center transition-translate duration-300 absolute w-full h-full z-10 bg-black cursor-progress`,
      down: `flex flex-col items-center justify-center transition-translate duration-300 absolute w-full h-full z-10 bg-black cursor-progress translate-y-full`
    }
  },
  orange: {
    main: 'w-full h-full bg-white border-b-orange text-orange shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out overflow-hidden',
    overlay: {
      up: `flex flex-col opacity-90 items-center justify-center transition-translate duration-300 absolute w-full h-full z-10 bg-orange cursor-progress`,
      down: `flex flex-col items-center justify-center transition-translate duration-300 absolute w-full h-full z-10 bg-orange cursor-progress translate-y-full`
    }
  },
  purple: {
    main: 'w-full h-full bg-white border-b-purple text-purple shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out overflow-hidden',
    overlay: {
      up: `flex flex-col opacity-90 items-center justify-center transition-translate duration-300 absolute w-full h-full z-10 bg-purple cursor-progress`,
      down: `flex flex-col items-center justify-center transition-translate duration-300 absolute w-full h-full z-10 bg-purple cursor-progress translate-y-full`
    }
  }
};

const chessIcons: IconType[] = [TbChessQueen, TbChessBishop, TbChessRook, TbChessKing];

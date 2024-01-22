'use client';
import { EventHandler, MouseEvent, useEffect, useState } from 'react';
import { ApolloProvider, useMutation } from '@apollo/client';

import { redirect } from 'next/navigation';

import { useEvents, useOauthContext } from '../../services';
import {
  activeUserSlice,
  fetchLichessAccountInfo,
  selectActiveUserLichessData,
  useDispatch,
  useSelector
} from '../../redux';
import { Button, Header } from '../../components';
import { useOauthService } from '../hooks';
import { LOGIN_USER } from '../../services/graphql/mutations/loginUser';
import { apolloClient } from '../../services/graphql';
import { GameTypeSelect } from './GametypeSelect';
import { merriweather } from '../fonts';
import { GameTypeEnum } from '../../__generated__/graphql';

export default function Home() {
  const { oauthService } = useOauthContext();
  const { accessToken, logout } = useOauthService(oauthService);
  const { username, userId } = useSelector(selectActiveUserLichessData);
  const dispatch = useDispatch();
  const doLogout = () => {
    logout();
    dispatch(activeUserSlice.actions.logoutLichessUser());
  };
  useEffect(() => {
    if (accessToken) {
      if (!(username && userId)) {
        dispatch(fetchLichessAccountInfo(accessToken.value));
      }
    } else {
      redirect('./login');
    }
  }, [accessToken, dispatch, userId, username]);
  return (
    <ApolloProvider client={apolloClient}>
      {userId && username ? <HomeLoggedIn logout={doLogout} /> : <div>Loading</div>}
    </ApolloProvider>
  );
}

const gameTypes = [
  {
    type: GameTypeEnum.Wins_3,
    title: 'First to 3',
    description: 'First player to solve 3 puzzles wins'
  },
  {
    type: GameTypeEnum.Wins_4,
    title: 'First to 4',
    description: 'First player to solve 4 puzzles wins'
  },
  {
    type: GameTypeEnum.Wins_5,
    title: 'First to 5',
    description: 'First player to solve 4 puzzles wins'
  },
  {
    type: GameTypeEnum.Time_1Min,
    title: '1 Minute',
    description: 'Complete as many puzzles as you can in 1 minute'
  },
  {
    type: GameTypeEnum.Time_2Mins,
    title: '2 Minutes',
    description: 'Complete as many puzzles as you can in 2 minutes'
  },
  {
    type: GameTypeEnum.Time_3Mins,
    title: '3 Minutes',
    description: 'Complete as many puzzles as you can in 3 minutes'
  }
];

interface HomeLoggedInProps {
  logout: EventHandler<MouseEvent<HTMLButtonElement>>;
}

function HomeLoggedIn(props: HomeLoggedInProps) {
  const {
    username,
    userId: lichessUserId,
    puzzleRating
  } = useSelector(selectActiveUserLichessData);
  const dispatch = useDispatch();

  const [loginUser, { data }] = useMutation(LOGIN_USER);
  const [lookingForGameType, setLookingForGameType] = useState<GameTypeEnum | null>(null);

  const eventSocketService = useEvents(data?.loginUser.id as string);
  useEffect(() => {
    if (username && lichessUserId && puzzleRating) {
      loginUser({
        variables: {
          userData: {
            lichessId: lichessUserId,
            lichessUsername: username,
            lichessPuzzleRating: puzzleRating
          }
        }
      });
    }
  }, [username, lichessUserId, puzzleRating, loginUser]);
  useEffect(() => {
    if (data?.loginUser.id && data?.loginUser.lichessPuzzleRating) {
      dispatch(activeUserSlice.actions.setId(data?.loginUser.id));
      eventSocketService.notifyLogin(data?.loginUser.id, data?.loginUser.lichessPuzzleRating);
      return eventSocketService.on('GameStart', (payload) => redirect(`./game/${payload.gameId}`));
    }
  }, [data, eventSocketService, dispatch]);

  const onSelectGameType = (type: GameTypeEnum | null) => {
    eventSocketService.notifyUserJoinGameLobby(type);
    setLookingForGameType(type);
  };
  return (
    <>
      <Header>
        <h5 className={`text-lg ${merriweather.className}`}>
          Hello&nbsp;
          <a
            className="underline text-purple"
            href={`https://lichess.org/@/${lichessUserId}`}
            target="_blank"
          >
            {username}
          </a>
        </h5>
        <Button text="Logout" onClick={props.logout} color={'red'}></Button>
      </Header>
      <div className="px-12 py-4">
        <GameTypeSelect
          gameTypes={gameTypes}
          onSelectGameType={onSelectGameType}
          lookingForGameType={lookingForGameType}
        />
      </div>
    </>
  );
}

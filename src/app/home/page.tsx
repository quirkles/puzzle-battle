'use client';
import { EventHandler, MouseEvent, useEffect } from 'react';
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
    type: 'first-to-3',
    title: 'First to 3 wins',
    description: 'First to 3 wins'
  },
  {
    type: 'first-to-4',
    title: 'First to 4 wins',
    description: 'First to 4 wins'
  },
  {
    type: 'first-to-5',
    title: 'First to 5 wins',
    description: 'First to 5 wins'
  },
  {
    type: '1-min',
    title: 'Play for one minute, most solves wins.',
    description: 'Complete as many as you can in 1 minute'
  },
  {
    type: '2-mins',
    title: 'Play for two minutes, most solves wins.',
    description: 'Complete as many as you can in 2 minutes'
  },
  {
    type: '3-mins',
    title: 'Play for three minutes, most solves wins.',
    description: 'Complete as many as you can in 3 minutes'
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
  const eventSocketService = useEvents();
  const dispatch = useDispatch();

  const [loginUser, { data }] = useMutation(LOGIN_USER);
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
    console.log('DATA', data);
  }, [data]);
  useEffect(() => {
    if (data?.loginUser.id) {
      dispatch(activeUserSlice.actions.setId(data?.loginUser.id));
      eventSocketService.notifyLogin(data?.loginUser.id);
      return eventSocketService.on('GameStart', (payload) => redirect(`./game/${payload.gameId}`));
    }
  }, [data, eventSocketService]);
  return (
    <>
      <Header>
        <h5 className="font-serif text-lg">
          Hello&nbsp;
          <a className="underline text-purple" href={`https://lichess.com/${lichessUserId}`}>
            {username}
          </a>
        </h5>
        <Button text="Logout" onClick={props.logout} color={'red'}></Button>
      </Header>
      <div className="px-12 py-4">
        <GameTypeSelect gameTypes={gameTypes} />
      </div>
    </>
  );
}

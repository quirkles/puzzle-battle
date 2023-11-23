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
    if (data?.loginUser.id) {
      dispatch(activeUserSlice.actions.setId(data?.loginUser.id));
      eventSocketService.notifyLogin(data?.loginUser.id);
      return eventSocketService.on('GameStart', (payload) => redirect(`./game/${payload.gameId}`));
    }
  }, [data, eventSocketService]);
  return (
    <>
      <Header>
        <span>Hello {username}</span>
        <Button text="Logout" onClick={props.logout} color={'red'}></Button>
      </Header>
    </>
  );
}

/* Instruments */

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.activeUserSlice.username)`

import { ReduxState } from '../../store';

export const selectActiveUserLichessId = (state: ReduxState) =>
  state.activeUserSlice.lichess.userId;
export const selectActiveUserLichessUsername = (state: ReduxState) =>
  state.activeUserSlice.lichess.username;
export const selectActiveUserLichessRating = (state: ReduxState) =>
  state.activeUserSlice.lichess.puzzleRating;
export const selectActiveUserLichessAccessToken = (state: ReduxState) =>
  state.activeUserSlice.lichess.accessToken;
export const selectActiveUserLichessData = (state: ReduxState) => state.activeUserSlice.lichess;

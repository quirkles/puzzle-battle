/* Instruments */
import {selectActiveUserLichessUsername} from './selectors'
import {v4} from "uuid";
import {createAppAsyncThunk} from "../../createAppAsyncThunk";
import {ReduxThunkAction} from "../../store";
import {activeUserSlice} from "./activeUserSlice";
import axios from "axios";

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchLichessAccountInfo = createAppAsyncThunk(
    'activeUser/fetchLichessAccountInfo',
    async (apiToken: string): Promise<{
        lichessId: string;
        lichessUsername: string;
        lichessPuzzleRating: number | null;
    }> => {
        const response = await axios.get(`https://lichess.org/api/account`, {
            headers: {
                Authorization: `Bearer ${apiToken}`
            }
        })
        return {
            lichessId: response.data.id,
            lichessUsername: response.data.username,
            lichessPuzzleRating: Number(response.data.perfs?.puzzle?.rating) || null,
        }
    }
)

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const randomlyAssignUsernameIfEmpty =
    (): ReduxThunkAction =>
        (dispatch, getState) => {
            const currentValue = selectActiveUserLichessUsername(getState())

            if (currentValue === null) {
                dispatch(activeUserSlice.actions.setLichessUsername(v4()))
            }
        }

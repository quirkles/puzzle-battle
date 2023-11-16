/* Instruments */
import {selectActiveUserLichessId} from './selectors'
import {v4} from "uuid";
import {createAppAsyncThunk} from "../../createAppAsyncThunk";
import {ReduxThunkAction} from "../../store";
import {activeUserSlice} from "./activeUserSlice";

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const verifyNameIsUnique = createAppAsyncThunk(
    'activeUser/verifyNameIsUnique',
    async (name: string): Promise<string | null> => {
        const response = await asyncProcess(name)

        // The value we return becomes the `fulfilled` action payload
        return (response && name) || null
    }
)

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const randomlyAssignUsernameIfEmpty =
    (): ReduxThunkAction =>
        (dispatch, getState) => {
            const currentValue = selectActiveUserLichessId(getState())

            if (currentValue === null) {
                dispatch(activeUserSlice.actions.setLichessUsername(v4()))
            }
        }

async function asyncProcess(name: string): Promise<boolean> {
    return new Promise(res => setTimeout(() => res(true), 500))
}

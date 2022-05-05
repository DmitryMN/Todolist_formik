import { Dispatch } from "redux";
import { authApi } from "../../api/todolists-api";
import {setAppStatusAC, SetAppErrorActionType, SetAppStatusActionType} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';

const initialState = {
    isLoggedIn: false
}

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return { ...state, isLoggedIn: action.value }
        default:
            return state;
    }
}

export const setIsLoggedInAC = (value: boolean) =>
    ({ type: 'login/SET-IS-LOGGED-IN', value } as const);

//type
type ActionType = ReturnType<typeof setIsLoggedInAC> | SetAppErrorActionType | SetAppStatusActionType;

export const loginTC = (data: any) => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch(setAppStatusAC('loading'));
        authApi.login(data).then((res) => {
            if(res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        }).catch(error => {
            handleServerNetworkError(error, dispatch);
        });
    }
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authApi.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {
        }
    })
 }
 
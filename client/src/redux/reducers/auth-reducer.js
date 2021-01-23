import {USER_LOADING, USER_LOADED,
    LOGIN_SUCCESS, REGISTER_SUCCESS,
    AUTH_ERROR, LOGIN_FAIL, LOGOUT_SUCCESS,
    REGISTER_FAIL} from "../actions/types";

const initialState = {
    token: localStorage.getItem("token"),
    isAuth: null,
    isLoading: false,
    user: null
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }

        case USER_LOADED:
            return {
                ...state,
                isAuth: true,
                isLoading: false,
                user: action.payload
            }

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuth: true,
                isLoading: false
            }

        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                user: null,
                isAuth: false,
                isLoading: false
            }

        default :
            return state;
    }
}


export default authReducer;